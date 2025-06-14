function minEnergy(
    start: number,
    shops: number[],
    stations: number[],
    target: number
  ): number {
    const shopSet = new Set(shops);
    const stationSet = new Set(stations);
  
    type Step = {
      position: number;
      visitShops: number[];
      energyUse: number;
    };
  
    const queue: Step[] = [{
      position: start,
      visitShops: [],
      energyUse: 0
    }];
  
    const visitedState = new Set<string>();
    
    function makeKey(position: number, visitShops: number[]): string {
        const sortShops = visitShops.sort((a, b) => a - b);
        const shopsString = sortShops.join(',');
        const key = `${position}-${shopsString}`;
        
        return key;
    }

    for (let i = 0; i < queue.length; i++) {
      const current = queue[i];
      const key = makeKey(current.position, current.visitShops);
      console.log(key);
      if (visitedState.has(key)) continue;
      visitedState.add(key);
  
      const newVisited = new Set(current.visitShops);
      if (shopSet.has(current.position)) {
        newVisited.add(current.position);
      }
  
      if (current.position === target && newVisited.size === shops.length) {
        return current.energyUse;
      }
  
      for (const nextPos of [current.position - 1, current.position + 1]) {
        if (nextPos >= 1 && nextPos <= 1000) {
          queue.push({
            position: nextPos,
            visitShops: Array.from(newVisited),
            energyUse: current.energyUse + 1
          });
        }
      }
  
      if (stationSet.has(current.position)) {
        for (const station of stations) {
          if (station !== current.position) {
            queue.push({
              position: station,
              visitShops: Array.from(newVisited),
              energyUse: current.energyUse
            });
          }
        }
      }
    }

    return -1; 
  }

  console.log(minEnergy(2, [4,9], [3,6,8], 7));
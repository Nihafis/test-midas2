function minEnergy(start, shops, stations, target) {
    var shopSet = new Set(shops);
    var stationSet = new Set(stations);
    var shopIndexMap = new Map();
    shops.forEach(function (shop, idx) { return shopIndexMap.set(shop, idx); });
    var totalShopMask = (1 << shops.length) - 1;
    var visitedStates = new Set();
    var queue = [{ pos: start, visit: "0", energy: 0 }];
    while (queue.length > 0) {
        var curr = queue.shift();
        var stateKey = "".concat(curr.pos, "-").concat(curr.visit);
        if (visitedStates.has(stateKey))
            continue;
        visitedStates.add(stateKey);
        var visitedMask = parseInt(curr.visit, 2);
        if (curr.pos === target && visitedMask === totalShopMask) {
            return curr.energy;
        }
        // Check if current is shop
        var newVisitedMask = visitedMask;
        if (shopSet.has(curr.pos)) {
            var idx = shopIndexMap.get(curr.pos);
            newVisitedMask = visitedMask | (1 << idx);
        }
        // Move to adjacent positions (left and right)
        for (var _i = 0, _a = [-1, 1]; _i < _a.length; _i++) {
            var delta = _a[_i];
            var nextPos = curr.pos + delta;
            if (nextPos >= 1 && nextPos <= 1000) {
                queue.push({
                    pos: nextPos,
                    visit: newVisitedMask.toString(2),
                    energy: curr.energy + 1,
                });
            }
        }
        // Teleport to other stations with zero energy
        if (stationSet.has(curr.pos)) {
            for (var _b = 0, stations_1 = stations; _b < stations_1.length; _b++) {
                var station = stations_1[_b];
                if (station !== curr.pos) {
                    queue.push({
                        pos: station,
                        visit: newVisitedMask.toString(2),
                        energy: curr.energy,
                    });
                }
            }
        }
    }
    return -1; // not reachable
}
var paramse = [{ start: 1, shops: [4, 9], stations: [3, 6, 8], target: 7 }];

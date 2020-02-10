import React from 'react';





export function colorCoder(temp) {
    
    let namedClass;
    for (let i = 0; i < classNameSelections.length; i++){
        if (temp > classNameSelections[i][0]) {
            namedClass = classNameSelections[i][1]
        }
    }
    
    
    
    return namedClass;
}

let classNameSelections = [[-999, "frigid"], [-17, "freezing"], [10, "frigid"], [32, "cold"], [40, "brisk"], [52, "cool"], [55, "mid"],
[60, "mild"], [65, "lukewarm"], [70, "warm"], [75, "hot"], [90, "sweltering"], [100, "roasted"]];
////colors
//
//
/*
CEF8FF //dead <-17
98F0FF //freezing -17 - 10  
3CE3FF// frigid 10-31
58FEC5//cold 32-41
11FFAD//brisk  40- 51
3CFF9F//cool 52-55
2DFE7C//mid 55-60
27FF51//mild 60-65
1BCF01//lukewarm 65-70
7AFF00//warm 70-74
E2E702//hot 75-80
E7B502//very hot 81-90
E77902//sweltering 90-100
FF1300//roasted >100
*/
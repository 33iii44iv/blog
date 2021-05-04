---
title: "ランダムな数字を含むリストを生成 [C#]"
date: "2021-05-04T13:30:00"
description: ランダムな数字を含むリストを生成 [C#]
tags:
  - c_sharp
---

## ランダムな数字のリスト
- 要素数可変


```cs:title=RandomIntList.cs
public static List<int> RandomList(int length, int minValue, int maxValue)
{
    Random r = new();
    return Enumerable.Range(start: 1, count: length)
                     .Select(selector: _ => r.Next(minValue: minValue, maxValue: maxValue))
                     .ToList();
}
```

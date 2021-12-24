---
title: "Pandas DataFrame 데이터 조작"
description:
date: 2020-10-03
update: 2020-10-03
tags:
  - python
  - pandas
series: "python pandas"
---

Pandas는 Numpy의 2차원 배열에서 가능한 대부분의 데이터 처리가 가능하며 추가로 데이터 처리 및 변환을 위한 다양한 함수와 메서드를 제공한다.

## 데이터 갯수 세기

가장 간단한 데이터 분석은 데이터의 갯수를 세는 것이나. `count` 메서드를 사용하는데, 주의할 점은 NaN값은 세지 않는다는 것이다.

```python
import pandas as pd 
import numpy as np
s = pd.Series(range(10))
s[3] = np.nan
s
```
    0    0.0
    1    1.0
    2    2.0
    3    NaN
    4    4.0
    5    5.0
    6    6.0
    7    7.0
    8    8.0
    9    9.0
    dtype: float64




```python
s.count()
```




    9



데이터프레임에서는 각 열마다 별도로 데이터 갯수를 센다. 데이터에서 값이 누락된 부분을 찾을 때 유용하다.


```python
np.random.seed(2)
df = pd.DataFrame(np.random.randint(5, size=(4,4)), dtype=float)
df.iloc[2,3] = np.nan
df
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>0</th>
      <th>1</th>
      <th>2</th>
      <th>3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>3.0</td>
      <td>2.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>3.0</td>
      <td>0.0</td>
      <td>2.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>3.0</td>
      <td>2.0</td>
      <td>4.0</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>3</th>
      <td>4.0</td>
      <td>3.0</td>
      <td>4.0</td>
      <td>2.0</td>
    </tr>
  </tbody>
</table>
</div>




```python
df.count()
```




    0    4
    1    4
    2    4
    3    3
    dtype: int64



## 카테고리 값 세기

Series의 값이 정수, 문자열, 카테고리 값인 경우에는 value_counts 매서드로 각각의 값이 나온 횟수를 셀 수 있다.


```python
np.random.seed(1)
s2 = pd.Series(np.random.randint(6, size=100))
s2.tail()
```




    95    4
    96    5
    97    2
    98    4
    99    3
    dtype: int32




```python
s2.value_counts()
```




    1    22
    0    18
    4    17
    5    16
    3    14
    2    13
    dtype: int64



DataFrame에는 `value_counts` 매서드가 없으므로 각 열마다 별도 확인 해야 한다.


```python
df[0].value_counts()
```




    3.0    2
    4.0    1
    0.0    1
    Name: 0, dtype: int64



## 정렬

데이터를 정렬하려면 `sort_index`와 `sord_values`매서드를 사용한다. `sort_index`는 인덱스 값을 기준으로, `sort_values`는 데이터 값을 기준으로 정렬한다.

앞서 `s2` Series의 각 데이터 값에 따른 데이터 갯수를 보기좋게 정렬하려면 `sort_index`를 사용한다.


```python
s2.value_counts().sort_index()
```




    0    18
    1    22
    2    13
    3    14
    4    17
    5    16
    dtype: int64



NaN값이 있는 경우에는 정렬하면 NaN값은 마지막에 위치한다.


```python
s.sort_values()
```




    0    0.0
    1    1.0
    2    2.0
    4    4.0
    5    5.0
    6    6.0
    7    7.0
    8    8.0
    9    9.0
    3    NaN
    dtype: float64



큰 수에서 작은 수로 반대방향 정렬하려면 `ascending=False`인수를 지정한다.


```python
s.sort_values(ascending=False)
```




    9    9.0
    8    8.0
    7    7.0
    6    6.0
    5    5.0
    4    4.0
    2    2.0
    1    1.0
    0    0.0
    3    NaN
    dtype: float64



DataFrame에서 `sort_values` 매서드를 사용하려면 `by` 인수로 정렬 기준이 되는 열을 지정해 주어야 한다.


```python
df.sort_values(by=1)
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>0</th>
      <th>1</th>
      <th>2</th>
      <th>3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>3.0</td>
      <td>2.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>3.0</td>
      <td>0.0</td>
      <td>2.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>3.0</td>
      <td>2.0</td>
      <td>4.0</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>3</th>
      <td>4.0</td>
      <td>3.0</td>
      <td>4.0</td>
      <td>2.0</td>
    </tr>
  </tbody>
</table>
</div>



`by` 인수에 리스트 값을 넣으면 이 순서대로 정렬 기준이 우선순위가 된다.


```python
df.sort_values(by=[1,2])
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>0</th>
      <th>1</th>
      <th>2</th>
      <th>3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1</th>
      <td>3.0</td>
      <td>0.0</td>
      <td>2.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>0</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>3.0</td>
      <td>2.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>3.0</td>
      <td>2.0</td>
      <td>4.0</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>3</th>
      <td>4.0</td>
      <td>3.0</td>
      <td>4.0</td>
      <td>2.0</td>
    </tr>
  </tbody>
</table>
</div>



## 행/열 합계

행과 열의 합계를 구할 때는 `sum(axis)` 매서드를 사용한다.

- 행 합계 : axis=1
- 열 합계 : axis=0 (기본값이므로 생략 가능)


```python
np.random.seed(1)
df2 = pd.DataFrame(np.random.randint(10, size=(4,8)))
df2
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>0</th>
      <th>1</th>
      <th>2</th>
      <th>3</th>
      <th>4</th>
      <th>5</th>
      <th>6</th>
      <th>7</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>5</td>
      <td>8</td>
      <td>9</td>
      <td>5</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>7</td>
    </tr>
    <tr>
      <th>1</th>
      <td>6</td>
      <td>9</td>
      <td>2</td>
      <td>4</td>
      <td>5</td>
      <td>2</td>
      <td>4</td>
      <td>2</td>
    </tr>
    <tr>
      <th>2</th>
      <td>4</td>
      <td>7</td>
      <td>7</td>
      <td>9</td>
      <td>1</td>
      <td>7</td>
      <td>0</td>
      <td>6</td>
    </tr>
    <tr>
      <th>3</th>
      <td>9</td>
      <td>9</td>
      <td>7</td>
      <td>6</td>
      <td>9</td>
      <td>1</td>
      <td>0</td>
      <td>1</td>
    </tr>
  </tbody>
</table>
</div>




```python
df2.sum(axis=1)
```




    0    35
    1    34
    2    41
    3    42
    dtype: int64




```python
df2.sum(axis=0)
```




    0    24
    1    33
    2    25
    3    24
    4    15
    5    10
    6     5
    7    16
    dtype: int64



행과 열의 합을 행/열에 추가해보자.


```python
df2['row_sum'] = df2.sum(axis=1)
df2
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>0</th>
      <th>1</th>
      <th>2</th>
      <th>3</th>
      <th>4</th>
      <th>5</th>
      <th>6</th>
      <th>7</th>
      <th>row_sum</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>5</td>
      <td>8</td>
      <td>9</td>
      <td>5</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>7</td>
      <td>35</td>
    </tr>
    <tr>
      <th>1</th>
      <td>6</td>
      <td>9</td>
      <td>2</td>
      <td>4</td>
      <td>5</td>
      <td>2</td>
      <td>4</td>
      <td>2</td>
      <td>34</td>
    </tr>
    <tr>
      <th>2</th>
      <td>4</td>
      <td>7</td>
      <td>7</td>
      <td>9</td>
      <td>1</td>
      <td>7</td>
      <td>0</td>
      <td>6</td>
      <td>41</td>
    </tr>
    <tr>
      <th>3</th>
      <td>9</td>
      <td>9</td>
      <td>7</td>
      <td>6</td>
      <td>9</td>
      <td>1</td>
      <td>0</td>
      <td>1</td>
      <td>42</td>
    </tr>
  </tbody>
</table>
</div>




```python
df2.loc['col_sum', :] = df2.sum()
df2
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>0</th>
      <th>1</th>
      <th>2</th>
      <th>3</th>
      <th>4</th>
      <th>5</th>
      <th>6</th>
      <th>7</th>
      <th>row_sum</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>5.0</td>
      <td>8.0</td>
      <td>9.0</td>
      <td>5.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>7.0</td>
      <td>35.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>6.0</td>
      <td>9.0</td>
      <td>2.0</td>
      <td>4.0</td>
      <td>5.0</td>
      <td>2.0</td>
      <td>4.0</td>
      <td>2.0</td>
      <td>34.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>4.0</td>
      <td>7.0</td>
      <td>7.0</td>
      <td>9.0</td>
      <td>1.0</td>
      <td>7.0</td>
      <td>0.0</td>
      <td>6.0</td>
      <td>41.0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>9.0</td>
      <td>9.0</td>
      <td>7.0</td>
      <td>6.0</td>
      <td>9.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>42.0</td>
    </tr>
    <tr>
      <th>col_sum</th>
      <td>24.0</td>
      <td>33.0</td>
      <td>25.0</td>
      <td>24.0</td>
      <td>15.0</td>
      <td>10.0</td>
      <td>5.0</td>
      <td>16.0</td>
      <td>152.0</td>
    </tr>
  </tbody>
</table>
</div>



## apply 변환
행이나 열 단위로 더 복잡한 처리를 하고 싶을 때는 `apply` 매서드를 사용한다. 인수로 행 또는 열을 받는 함수를 `apply`매서드의 인수로 넣으면 각 열(또는 행)을 반복하여 그 함수에 적용시킨다.


```python
df3 = pd.DataFrame({
    'A': [1,3,4,3,4],
    'B': [2,3,1,2,3],
    'C': [1,5,2,4,4]
})
df3
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>A</th>
      <th>B</th>
      <th>C</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>2</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>3</td>
      <td>3</td>
      <td>5</td>
    </tr>
    <tr>
      <th>2</th>
      <td>4</td>
      <td>1</td>
      <td>2</td>
    </tr>
    <tr>
      <th>3</th>
      <td>3</td>
      <td>2</td>
      <td>4</td>
    </tr>
    <tr>
      <th>4</th>
      <td>4</td>
      <td>3</td>
      <td>4</td>
    </tr>
  </tbody>
</table>
</div>



예를 들어 각 열의 최대값과 최소값의 차이를 구하고 싶으면 다음과 같은 람다 함수를 넣는다.


```python
df3.apply(lambda x: x.max() - x.min()) # axis=0 기본값
```




    A    3
    B    2
    C    4
    dtype: int64



마찬가지로 행에 대해 적용하고 싶다면 `axis=1` 인수를 추가해 주면 된다.


```python
df3.apply(lambda x: x.max() - x.min(), axis=1)
```




    0    1
    1    2
    2    3
    3    2
    4    1
    dtype: int64



각 열에 대해 어떤값이 얼마나 사용되고 있는지 알고 싶다면 `value_counts` 함수를 넣을 수도 있다.


```python
df3.apply(pd.value_counts) # axis=0 
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>A</th>
      <th>B</th>
      <th>C</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1</th>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>NaN</td>
      <td>2.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>2.0</td>
      <td>2.0</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>4</th>
      <td>2.0</td>
      <td>NaN</td>
      <td>2.0</td>
    </tr>
    <tr>
      <th>5</th>
      <td>NaN</td>
      <td>NaN</td>
      <td>1.0</td>
    </tr>
  </tbody>
</table>
</div>



NaN 값은 fillna 매서드를 사용하여 원하는 값으로 바꿀 수 있다. astype 매서드로 전체 데이터의 자료형을 바꾸는 것도 가능하다.


```python
# NaN은 0으로 바꾸고 값의 타입을 int로 변경
df3.apply(pd.value_counts).fillna(0).astype(int)
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>A</th>
      <th>B</th>
      <th>C</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1</th>
      <td>1</td>
      <td>1</td>
      <td>1</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0</td>
      <td>2</td>
      <td>1</td>
    </tr>
    <tr>
      <th>3</th>
      <td>2</td>
      <td>2</td>
      <td>0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>2</td>
      <td>0</td>
      <td>2</td>
    </tr>
    <tr>
      <th>5</th>
      <td>0</td>
      <td>0</td>
      <td>1</td>
    </tr>
  </tbody>
</table>
</div>



## 실수 값을 카테고리 값으로 변환

실수 값을 크기 기준으로 하여 카테고리 값으로 변환하고 싶을 때는 다음과 같은 명령을 사용한다.

- cut : 실수 값의 경계선을 지정하는 경우
- qcut : 갯수가 똑같은 구간으로 나누는 경우


```python
# 나이 데이터
ages = [0, 2, 10, 21, 23, 37, 31, 61, 20, 41, 32, 100]
```

`cut` 명령을 사용하면 실수값을 다음처럼 카테고리 값으로 바꿀 수 있다. `bins` 인수는 카테고리를 나누는 기준값이 된다. 영역을 넘는 값은 NaN으로 처리된다.


```python
bins = [1, 15, 25, 35, 60, 99] # 카테고리 기준값
labels = ["미성년자", "청년", "중년", "장년", "노년"] # 카테고리
cats = pd.cut(ages, bins, labels=labels)
cats
```




    [NaN, '미성년자', '미성년자', '청년', '청년', ..., '노년', '청년', '장년', '중년', NaN]
    Length: 12
    Categories (5, object): ['미성년자' < '청년' < '중년' < '장년' < '노년']



`cut` 명령이 반환하는 값은 `Categorical` 클래스 객체이다. 이 객체는 `categories`속성으로 라벨 문자열을, `codes` 속성으로 정수로 인코딩한 카테고리 값을 가진다.


```python
type(cats)
```




    pandas.core.arrays.categorical.Categorical




```python
cats.categories
```




    Index(['미성년자', '청년', '중년', '장년', '노년'], dtype='object')




```python
cats.codes # -1은 기준값에 벗어난 NaN값
```




    array([-1,  0,  0,  1,  1,  3,  2,  4,  1,  3,  2, -1], dtype=int8)




```python
df4 = pd.DataFrame(ages, columns=["ages"])
df4["age_cat"] = pd.cut(df4.ages, bins, labels=labels)
df4
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>ages</th>
      <th>age_cat</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>미성년자</td>
    </tr>
    <tr>
      <th>2</th>
      <td>10</td>
      <td>미성년자</td>
    </tr>
    <tr>
      <th>3</th>
      <td>21</td>
      <td>청년</td>
    </tr>
    <tr>
      <th>4</th>
      <td>23</td>
      <td>청년</td>
    </tr>
    <tr>
      <th>5</th>
      <td>37</td>
      <td>장년</td>
    </tr>
    <tr>
      <th>6</th>
      <td>31</td>
      <td>중년</td>
    </tr>
    <tr>
      <th>7</th>
      <td>61</td>
      <td>노년</td>
    </tr>
    <tr>
      <th>8</th>
      <td>20</td>
      <td>청년</td>
    </tr>
    <tr>
      <th>9</th>
      <td>41</td>
      <td>장년</td>
    </tr>
    <tr>
      <th>10</th>
      <td>32</td>
      <td>중년</td>
    </tr>
    <tr>
      <th>11</th>
      <td>100</td>
      <td>NaN</td>
    </tr>
  </tbody>
</table>
</div>



정말 쉽게 데이터를 정의한 카테고리기준으로 분류 하였다!

`qcut` 명령은 구각 경계선을 지정하지 않고 데이터 갯수가 같도록 지정한 수의 구간으로 나눈다. 예를 들어 다음 코드는 1000개의 데이터를 4개의 구간으로 나누는데 각 구간은 250개씩 데이터를 가진다.


```python
data = np.random.randn(1000)
cats = pd.qcut(data, 4, labels=["Q1", "Q2", "Q3", "Q4"])
cats
```




    ['Q2', 'Q1', 'Q2', 'Q3', 'Q1', ..., 'Q1', 'Q1', 'Q4', 'Q4', 'Q2']
    Length: 1000
    Categories (4, object): ['Q1' < 'Q2' < 'Q3' < 'Q4']




```python
pd.value_counts(cats)
```




    Q4    250
    Q3    250
    Q2    250
    Q1    250
    dtype: int64



성적을 비유하여 생각해보면 `cut`은 절대평가 기준이 되는 점수에 의해 분류가 되는 것이고 `qcut`은 상대평가 즉 점수의 순서대로 정렬하고 특정 수만큼씩 분류하는 것이라고 생각하면 될듯 싶다.

출처 : 데이터사이언스 스쿨(datascienceschool.net)
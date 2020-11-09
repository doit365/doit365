---
title: "DataFrame 피봇과 그룹"
path: "/pandas-07"
tags: ["Python"]
featuredImage: "./cover.png"
excerpt: 피봇테이블(pivot table)이란 데이터 열 중에서 두개의 열을 각각 행 인덱스, 열 인덱스로 사용하여 데이터를 조회하여 펼쳐놓은 것을 말한다.
created: 2020-10-18
updated: 2020-10-18
---
### 피봇테이블

피봇테이블(pivot table)이란 데이터 열 중에서 두개의 열을 각각 행 인덱스, 열 인덱스로 사용하여 데이터를 조회하여 펼쳐놓은 것을 말한다.

Pandas는 피봇테이블을 만들기 위한 `pivot` 매서드를 제공한다. 첫번째 인수로는 행 인덱스로 사용할 열 이름, 두뻔째 인수로는 열 인덱스로 사용할 열 이름, 그리고 마지막으로 데이터로 사용할 열 이름을 넣는다.

Pandas는 지정된 두 열을 각각 행 인덱스와 열 인덱스로 바꾼 후 행 인덱스 라벨 값이 첫번째 키의 값과 같고 열 인덱스의 라벨 값이 두번째 키의 값과 같은 데이터를 찾아서 해당 칸에 넣는다. 만약 주어진 데이터가 존재하지 않으면 해당 칸에 `NaN` 값을 넣는다.

다음 데이터는 각 도시의 연도별 인구를 나타낸 것이다.


```python
import pandas as pd 
data = {
    "도시": ["서울", "서울", "서울", "부산", "부산", "부산", "인천", "인천"],
    "연도": ["2015", "2010", "2005", "2015", "2010", "2005", "2015", "2010"],
    "인구": [9904312, 9631482, 9762546, 3448737, 3393191, 3512547, 2890451, 263203],
    "지역": ["수도권", "수도권", "수도권", "경상권", "경상권", "경상권", "수도권", "수도권"]
}
columns = ["도시", "연도", "인구", "지역"]
df1 = pd.DataFrame(data, columns=columns)
df1
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
      <th>도시</th>
      <th>연도</th>
      <th>인구</th>
      <th>지역</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>서울</td>
      <td>2015</td>
      <td>9904312</td>
      <td>수도권</td>
    </tr>
    <tr>
      <th>1</th>
      <td>서울</td>
      <td>2010</td>
      <td>9631482</td>
      <td>수도권</td>
    </tr>
    <tr>
      <th>2</th>
      <td>서울</td>
      <td>2005</td>
      <td>9762546</td>
      <td>수도권</td>
    </tr>
    <tr>
      <th>3</th>
      <td>부산</td>
      <td>2015</td>
      <td>3448737</td>
      <td>경상권</td>
    </tr>
    <tr>
      <th>4</th>
      <td>부산</td>
      <td>2010</td>
      <td>3393191</td>
      <td>경상권</td>
    </tr>
    <tr>
      <th>5</th>
      <td>부산</td>
      <td>2005</td>
      <td>3512547</td>
      <td>경상권</td>
    </tr>
    <tr>
      <th>6</th>
      <td>인천</td>
      <td>2015</td>
      <td>2890451</td>
      <td>수도권</td>
    </tr>
    <tr>
      <th>7</th>
      <td>인천</td>
      <td>2010</td>
      <td>263203</td>
      <td>수도권</td>
    </tr>
  </tbody>
</table>
</div>



이 데이터를 도시 이름이 열 인덱스가 되고 연도가 행 인덱스가 되어 행과 열 인덱스만 보면 어떤 도시의 어떤 시점의 인구를 쉽게 알수 있도록 피봇테이블로 만들어 보자. `pivot` 명령으로 사용하고 행 인덱스 인수로는 `도시`, 열 인덱스 인수로는 `연도`, 데이터 이름으로 `인구`를 입력하면 된다.


```python
df1.pivot("도시", "연도", "인구")
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
      <th>연도</th>
      <th>2005</th>
      <th>2010</th>
      <th>2015</th>
    </tr>
    <tr>
      <th>도시</th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>부산</th>
      <td>3512547.0</td>
      <td>3393191.0</td>
      <td>3448737.0</td>
    </tr>
    <tr>
      <th>서울</th>
      <td>9762546.0</td>
      <td>9631482.0</td>
      <td>9904312.0</td>
    </tr>
    <tr>
      <th>인천</th>
      <td>NaN</td>
      <td>263203.0</td>
      <td>2890451.0</td>
    </tr>
  </tbody>
</table>
</div>



이 피봇테이블의 값 3512547은 "도시"가 부산이고 "연도"가 2005년인 데이터를 "인구"열에서 찾은 값이다. 2005년 인천의 인구는 데이터에 없기 때문에 `NaN`으로 표시된다.

피봇테이블은 다음과 같이 `set_index` 명령과 `unstack` 명령을 사용하서 만들 수도 있다.


```python
df1.set_index(["도시","연도"])[["인구"]].unstack()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead tr th {
        text-align: left;
    }

    .dataframe thead tr:last-of-type th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr>
      <th></th>
      <th colspan="3" halign="left">인구</th>
    </tr>
    <tr>
      <th>연도</th>
      <th>2005</th>
      <th>2010</th>
      <th>2015</th>
    </tr>
    <tr>
      <th>도시</th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>부산</th>
      <td>3512547.0</td>
      <td>3393191.0</td>
      <td>3448737.0</td>
    </tr>
    <tr>
      <th>서울</th>
      <td>9762546.0</td>
      <td>9631482.0</td>
      <td>9904312.0</td>
    </tr>
    <tr>
      <th>인천</th>
      <td>NaN</td>
      <td>263203.0</td>
      <td>2890451.0</td>
    </tr>
  </tbody>
</table>
</div>



행 인덱스나 열 인덱스를 리스트로 주는 경우에는 다중 인덱스 피봇 테이블을 생성한다.


```python
df1.pivot(["지역","도시"], "연도", "인구")
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
      <th>연도</th>
      <th>2005</th>
      <th>2010</th>
      <th>2015</th>
    </tr>
    <tr>
      <th>지역</th>
      <th>도시</th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>경상권</th>
      <th>부산</th>
      <td>3512547.0</td>
      <td>3393191.0</td>
      <td>3448737.0</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">수도권</th>
      <th>서울</th>
      <td>9762546.0</td>
      <td>9631482.0</td>
      <td>9904312.0</td>
    </tr>
    <tr>
      <th>인천</th>
      <td>NaN</td>
      <td>263203.0</td>
      <td>2890451.0</td>
    </tr>
  </tbody>
</table>
</div>



행 인덱스와 열 인덱스는 데이터를 찾는 키(key)의 역할을 한다. 따라서 키 값으로 데이터가 단 하나만 찾아져야 한다. 만약 행 인덱스와 열 인덱스 조건을 만족하는 데이터가 2개 이상인 경우에는 에러가 발생한다. 예를 들어 위 데이터프레임에서 ("지역", "연도")를 키로 하면 ("수도권", "2015")에 해당하는 값이 두개 이상이므로 다음과 같이 에러가 발생한다.


```python
try:
    df1.pivot("지역", "연도", "인구")
except ValueError as e:
    print("ValueError:", e)
```

    ValueError: Index contains duplicate entries, cannot reshape
    

### 그룹분석

만약 키가 지정하는 조건에 맞는 데이터가 하나 이상이라서 데이터 그룹을 이루는 경우에는 그룹의 특성을 보여주는 그룹분석(group analysis)을 해야 한다.

그룹분석은 피봇테이블과 달리 키에 의해서 결정되는 데이터가 여러개가 있을 경우 미리 지정한 연선을 통해 그 그룹 데이터의 대표값을 계산한다. Pandas에서는 `groupby` 매서드를 사용하여 다음처럼 그룹분석을 한다.

> 1. 분석하고자 하는 시리즈나 데이터프레임에 `groupby` 매서드를 호출하여 그룹화를 한다.
> 2. 그룹 객체에 대해 그룹연산을 수행한다.

### 그룹연산 매서드

`groupby` 결과, 즉 `GroupBy` 클래스 객체의 뒤에 붙일 수 있는 그룹연산 매서드는 다양하다. 다음은 자주 사용되는 그룹연산 매서드들이다.

- `size`, `count` : 그룹 데이터의 개수
- `mean`, `median`, `min`, `max` : 그룹 데이터의 평균, 중앙값, 최소, 최대
- `sum`, `prod`, `std`, `var`, `quantile` : 그룹 데이터의 합계, 곱, 표준편차, 분산, 사분위수
- `first`, `last` : 그룹 데이터중 가장 첫번째 데이터와 가장 나중 데이터와

이 외에도 많이 사용되는 것으로는 다음과 같은 그룹 연산이 있다.

- `agg`, `aggregate`
    - 만약 원하는 구릅연산이 없는 경우 함수를 만들고 이 함수를 `agg`에 전달한다.
    - 또는 여러가지 그룹연산을 동시에 하고 싶은 경우 함수 이름 문자열의 리스트를 전달한다.
- `describe`
    - 하나의 그룹 대표값이 아니라 여러개의 값을 데이터프레임으로 구한다.
- `apply`
    - `describe` 처럼 하나의 대표값이 아닌 데이터프레임을 출력하지만 원하는 그룹연산이 없는 경우에 사용한다.
- `transform`
    - 그룹에 대한 대표값을 만드는 것이 아니라 그룹별 계산을 통해 데이터 자체를 변형한다.

예를 들어 다음과 같은 데이터가 있을 때 key1의 값(A 또는 B)에 따른 data1의 평균은 어떻게 구할까?


```python
import numpy as np 
np.random.seed(0)
df2 = pd.DataFrame({
    'key1': ['A', 'A', 'B', 'B', 'A'],
    'key2': ['one', 'two', 'one', 'two', 'one'],
    'data1': [1, 2, 3, 4, 5],
    'data2': [10, 20, 30, 40, 50]
})
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
      <th>key1</th>
      <th>key2</th>
      <th>data1</th>
      <th>data2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>A</td>
      <td>one</td>
      <td>1</td>
      <td>10</td>
    </tr>
    <tr>
      <th>1</th>
      <td>A</td>
      <td>two</td>
      <td>2</td>
      <td>20</td>
    </tr>
    <tr>
      <th>2</th>
      <td>B</td>
      <td>one</td>
      <td>3</td>
      <td>30</td>
    </tr>
    <tr>
      <th>3</th>
      <td>B</td>
      <td>two</td>
      <td>4</td>
      <td>40</td>
    </tr>
    <tr>
      <th>4</th>
      <td>A</td>
      <td>one</td>
      <td>5</td>
      <td>50</td>
    </tr>
  </tbody>
</table>
</div>



`groupby` 명령을 사용하여 그룹 A와 그룹 B로 구분한 그룹 데이터를 만든다.


```python
groups = df2.groupby(df2.key1)
groups
```




    <pandas.core.groupby.generic.DataFrameGroupBy object at 0x000002B5DE8DDAC0>



이 `GroupBy` 클래스 객체에는 각 그룹 데이터의 인덱스를 저장한 groups 속성이 있다.


```python
groups.groups
```




    {'A': [0, 1, 4], 'B': [2, 3]}



A그룹과 B그룹 데이터의 합계를 구하기 위해 `sum`이라는 그룹연산을 한다.


```python
groups.sum()
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
      <th>data1</th>
      <th>data2</th>
    </tr>
    <tr>
      <th>key1</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>A</th>
      <td>8</td>
      <td>80</td>
    </tr>
    <tr>
      <th>B</th>
      <td>7</td>
      <td>70</td>
    </tr>
  </tbody>
</table>
</div>



`GroupBy`클래스 객체를 명시적으로 얻을 필요가 없다면 `groupby` 매서드와 그룹연산 메서드를 연속으로 호출한다. 다음 예제는 열 `data1`에 대해서만 그룹연산을 하는 코드 이다.


```python
df2.data1.groupby(df2.key1).sum()
```




    key1
    A    8
    B    7
    Name: data1, dtype: int64



데이터를 그룹으로 나눈 `GroupBy` 클래스 객체 또는 그룹분석한 결과에서 `data1`만 뽑아도 된다.


```python
df2.groupby(df2.key1)["data1"].sum() # 'GroupBy' 클래스 객체에서 data1만 선택하여 분석
```




    key1
    A    8
    B    7
    Name: data1, dtype: int64




```python
df2.groupby(df2.key1).sum()["data1"]  # 전체 데이터를 분석한 후 data1만 선택한 경우
```




    key1
    A    8
    B    7
    Name: data1, dtype: int64



이번에는 복합 키 (key1, key2) 값에 따른 data1의 합계를 구하자. 분석하고자 하는 키가 복수이면 리스트를 사용한다.


```python
df2.data1.groupby([df2.key1, df2.key2]).sum()
```




    key1  key2
    A     one     6
          two     2
    B     one     3
          two     4
    Name: data1, dtype: int64



이 결과를 `unstack` 명령으로 피봇 테이블 행태로 만들수도 있다.


```python
df2.data1.groupby([df2['key1'], df2['key2']]).sum().unstack('key2')
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
      <th>key2</th>
      <th>one</th>
      <th>two</th>
    </tr>
    <tr>
      <th>key1</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>A</th>
      <td>6</td>
      <td>2</td>
    </tr>
    <tr>
      <th>B</th>
      <td>3</td>
      <td>4</td>
    </tr>
  </tbody>
</table>
</div>



그룹분석 기능을 사용하면 위의 인구 데이터로부터 지역별 합계를 구할 수도 있다.


```python
df1
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
      <th>도시</th>
      <th>연도</th>
      <th>인구</th>
      <th>지역</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>서울</td>
      <td>2015</td>
      <td>9904312</td>
      <td>수도권</td>
    </tr>
    <tr>
      <th>1</th>
      <td>서울</td>
      <td>2010</td>
      <td>9631482</td>
      <td>수도권</td>
    </tr>
    <tr>
      <th>2</th>
      <td>서울</td>
      <td>2005</td>
      <td>9762546</td>
      <td>수도권</td>
    </tr>
    <tr>
      <th>3</th>
      <td>부산</td>
      <td>2015</td>
      <td>3448737</td>
      <td>경상권</td>
    </tr>
    <tr>
      <th>4</th>
      <td>부산</td>
      <td>2010</td>
      <td>3393191</td>
      <td>경상권</td>
    </tr>
    <tr>
      <th>5</th>
      <td>부산</td>
      <td>2005</td>
      <td>3512547</td>
      <td>경상권</td>
    </tr>
    <tr>
      <th>6</th>
      <td>인천</td>
      <td>2015</td>
      <td>2890451</td>
      <td>수도권</td>
    </tr>
    <tr>
      <th>7</th>
      <td>인천</td>
      <td>2010</td>
      <td>263203</td>
      <td>수도권</td>
    </tr>
  </tbody>
</table>
</div>




```python
df1['인구'].groupby([df1['지역'], df1['연도']]).sum().unstack('연도')
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
      <th>연도</th>
      <th>2005</th>
      <th>2010</th>
      <th>2015</th>
    </tr>
    <tr>
      <th>지역</th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>경상권</th>
      <td>3512547</td>
      <td>3393191</td>
      <td>3448737</td>
    </tr>
    <tr>
      <th>수도권</th>
      <td>9762546</td>
      <td>9894685</td>
      <td>12794763</td>
    </tr>
  </tbody>
</table>
</div>



다음 데이터는 150 송이의 붓꽃(iris)에 대해 붓꽃 종(species)별로 꽃받침길이(sepal_langth), 꽃받침폭(sepal_width), 꽃잎길이(tetal_length), 꽃잎폭(petal_width)을 측정한 데이터이다.


```python
import seaborn as sns
iris = sns.load_dataset("iris")
iris
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
      <th>sepal_length</th>
      <th>sepal_width</th>
      <th>petal_length</th>
      <th>petal_width</th>
      <th>species</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>5.1</td>
      <td>3.5</td>
      <td>1.4</td>
      <td>0.2</td>
      <td>setosa</td>
    </tr>
    <tr>
      <th>1</th>
      <td>4.9</td>
      <td>3.0</td>
      <td>1.4</td>
      <td>0.2</td>
      <td>setosa</td>
    </tr>
    <tr>
      <th>2</th>
      <td>4.7</td>
      <td>3.2</td>
      <td>1.3</td>
      <td>0.2</td>
      <td>setosa</td>
    </tr>
    <tr>
      <th>3</th>
      <td>4.6</td>
      <td>3.1</td>
      <td>1.5</td>
      <td>0.2</td>
      <td>setosa</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5.0</td>
      <td>3.6</td>
      <td>1.4</td>
      <td>0.2</td>
      <td>setosa</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>145</th>
      <td>6.7</td>
      <td>3.0</td>
      <td>5.2</td>
      <td>2.3</td>
      <td>virginica</td>
    </tr>
    <tr>
      <th>146</th>
      <td>6.3</td>
      <td>2.5</td>
      <td>5.0</td>
      <td>1.9</td>
      <td>virginica</td>
    </tr>
    <tr>
      <th>147</th>
      <td>6.5</td>
      <td>3.0</td>
      <td>5.2</td>
      <td>2.0</td>
      <td>virginica</td>
    </tr>
    <tr>
      <th>148</th>
      <td>6.2</td>
      <td>3.4</td>
      <td>5.4</td>
      <td>2.3</td>
      <td>virginica</td>
    </tr>
    <tr>
      <th>149</th>
      <td>5.9</td>
      <td>3.0</td>
      <td>5.1</td>
      <td>1.8</td>
      <td>virginica</td>
    </tr>
  </tbody>
</table>
<p>150 rows × 5 columns</p>
</div>



각 붓꽃 종별로 가장 큰 값과 가장 작은 값의 비율을 구해보자. 이러한 계산을 하는 그룹연산 매서드는 없으므로 직접 함수로 만들고 `agg` 매서드를 이용해야 한다.


```python
def peak_to_peak_ratio(x):
    return x.max() / x.min()

iris.groupby(iris.species).agg(peak_to_peak_ratio)
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
      <th>sepal_length</th>
      <th>sepal_width</th>
      <th>petal_length</th>
      <th>petal_width</th>
    </tr>
    <tr>
      <th>species</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>setosa</th>
      <td>1.348837</td>
      <td>1.913043</td>
      <td>1.900000</td>
      <td>6.000000</td>
    </tr>
    <tr>
      <th>versicolor</th>
      <td>1.428571</td>
      <td>1.700000</td>
      <td>1.700000</td>
      <td>1.800000</td>
    </tr>
    <tr>
      <th>virginica</th>
      <td>1.612245</td>
      <td>1.727273</td>
      <td>1.533333</td>
      <td>1.785714</td>
    </tr>
  </tbody>
</table>
</div>



`describe` 매서드를 사용하면 다양한 기술 통계(descriptive statistics)값을 한 번에 구한다. 그룹별로 하나의 스칼라 값이 아니라 하나의 데이터프레임이 생성된다는 점에 주의하자.


```python
iris.groupby(iris.species).describe().T
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
      <th>species</th>
      <th>setosa</th>
      <th>versicolor</th>
      <th>virginica</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="8" valign="top">sepal_length</th>
      <th>count</th>
      <td>50.000000</td>
      <td>50.000000</td>
      <td>50.000000</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>5.006000</td>
      <td>5.936000</td>
      <td>6.588000</td>
    </tr>
    <tr>
      <th>std</th>
      <td>0.352490</td>
      <td>0.516171</td>
      <td>0.635880</td>
    </tr>
    <tr>
      <th>min</th>
      <td>4.300000</td>
      <td>4.900000</td>
      <td>4.900000</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>4.800000</td>
      <td>5.600000</td>
      <td>6.225000</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>5.000000</td>
      <td>5.900000</td>
      <td>6.500000</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>5.200000</td>
      <td>6.300000</td>
      <td>6.900000</td>
    </tr>
    <tr>
      <th>max</th>
      <td>5.800000</td>
      <td>7.000000</td>
      <td>7.900000</td>
    </tr>
    <tr>
      <th rowspan="8" valign="top">sepal_width</th>
      <th>count</th>
      <td>50.000000</td>
      <td>50.000000</td>
      <td>50.000000</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>3.428000</td>
      <td>2.770000</td>
      <td>2.974000</td>
    </tr>
    <tr>
      <th>std</th>
      <td>0.379064</td>
      <td>0.313798</td>
      <td>0.322497</td>
    </tr>
    <tr>
      <th>min</th>
      <td>2.300000</td>
      <td>2.000000</td>
      <td>2.200000</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>3.200000</td>
      <td>2.525000</td>
      <td>2.800000</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>3.400000</td>
      <td>2.800000</td>
      <td>3.000000</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>3.675000</td>
      <td>3.000000</td>
      <td>3.175000</td>
    </tr>
    <tr>
      <th>max</th>
      <td>4.400000</td>
      <td>3.400000</td>
      <td>3.800000</td>
    </tr>
    <tr>
      <th rowspan="8" valign="top">petal_length</th>
      <th>count</th>
      <td>50.000000</td>
      <td>50.000000</td>
      <td>50.000000</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>1.462000</td>
      <td>4.260000</td>
      <td>5.552000</td>
    </tr>
    <tr>
      <th>std</th>
      <td>0.173664</td>
      <td>0.469911</td>
      <td>0.551895</td>
    </tr>
    <tr>
      <th>min</th>
      <td>1.000000</td>
      <td>3.000000</td>
      <td>4.500000</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>1.400000</td>
      <td>4.000000</td>
      <td>5.100000</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>1.500000</td>
      <td>4.350000</td>
      <td>5.550000</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>1.575000</td>
      <td>4.600000</td>
      <td>5.875000</td>
    </tr>
    <tr>
      <th>max</th>
      <td>1.900000</td>
      <td>5.100000</td>
      <td>6.900000</td>
    </tr>
    <tr>
      <th rowspan="8" valign="top">petal_width</th>
      <th>count</th>
      <td>50.000000</td>
      <td>50.000000</td>
      <td>50.000000</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>0.246000</td>
      <td>1.326000</td>
      <td>2.026000</td>
    </tr>
    <tr>
      <th>std</th>
      <td>0.105386</td>
      <td>0.197753</td>
      <td>0.274650</td>
    </tr>
    <tr>
      <th>min</th>
      <td>0.100000</td>
      <td>1.000000</td>
      <td>1.400000</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>0.200000</td>
      <td>1.200000</td>
      <td>1.800000</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>0.200000</td>
      <td>1.300000</td>
      <td>2.000000</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>0.300000</td>
      <td>1.500000</td>
      <td>2.300000</td>
    </tr>
    <tr>
      <th>max</th>
      <td>0.600000</td>
      <td>1.800000</td>
      <td>2.500000</td>
    </tr>
  </tbody>
</table>
</div>



`apply` 매서드를 사용하면 `describe` 매서드처럼 하나의 그룹에 대해 하나의 대표값(스칼라 값)을 구하는게 아니라 데이터프레임을 만들 수 있다. 예를 들어 다음처럼 각 붓꽃 종별로 가장 꽃잎길이(petal length)가 큰 3개의 데이터를 뽑아낼 수도 있다.


```python
def top3_petal_length(df):
    return df.sort_values(by="petal_length", ascending=False)[:3]

iris.groupby(iris.species).apply(top3_petal_length)
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
      <th></th>
      <th>sepal_length</th>
      <th>sepal_width</th>
      <th>petal_length</th>
      <th>petal_width</th>
      <th>species</th>
    </tr>
    <tr>
      <th>species</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="3" valign="top">setosa</th>
      <th>24</th>
      <td>4.8</td>
      <td>3.4</td>
      <td>1.9</td>
      <td>0.2</td>
      <td>setosa</td>
    </tr>
    <tr>
      <th>44</th>
      <td>5.1</td>
      <td>3.8</td>
      <td>1.9</td>
      <td>0.4</td>
      <td>setosa</td>
    </tr>
    <tr>
      <th>23</th>
      <td>5.1</td>
      <td>3.3</td>
      <td>1.7</td>
      <td>0.5</td>
      <td>setosa</td>
    </tr>
    <tr>
      <th rowspan="3" valign="top">versicolor</th>
      <th>83</th>
      <td>6.0</td>
      <td>2.7</td>
      <td>5.1</td>
      <td>1.6</td>
      <td>versicolor</td>
    </tr>
    <tr>
      <th>77</th>
      <td>6.7</td>
      <td>3.0</td>
      <td>5.0</td>
      <td>1.7</td>
      <td>versicolor</td>
    </tr>
    <tr>
      <th>72</th>
      <td>6.3</td>
      <td>2.5</td>
      <td>4.9</td>
      <td>1.5</td>
      <td>versicolor</td>
    </tr>
    <tr>
      <th rowspan="3" valign="top">virginica</th>
      <th>118</th>
      <td>7.7</td>
      <td>2.6</td>
      <td>6.9</td>
      <td>2.3</td>
      <td>virginica</td>
    </tr>
    <tr>
      <th>117</th>
      <td>7.7</td>
      <td>3.8</td>
      <td>6.7</td>
      <td>2.2</td>
      <td>virginica</td>
    </tr>
    <tr>
      <th>122</th>
      <td>7.7</td>
      <td>2.8</td>
      <td>6.7</td>
      <td>2.0</td>
      <td>virginica</td>
    </tr>
  </tbody>
</table>
</div>



`transform` 매서드는 그룹별 대표값을 만드는 것이 아니라 그룹별 계산을 통해 데이터프레임 자체를 변화시킨다. 따라서 만들어진 데이터프레임의 크기는 원래 데이터프레임과 같다. 예를 들어 다음처럼 각 붓꽃 꽃잎길이가 해당 종 내에서 대/중/소 어느 것에 해당되는지에 대한 데이터프레임을 만들 수도 있다.


```python
def q3cut(s):
    return pd.qcut(s, 3, labels=["소", "중", "대"]).astype(str)

iris["petal_length_class"] = iris.groupby(iris.species).petal_length.transform(q3cut)
iris[["petal_length", "petal_length_class"]].tail(10)
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
      <th>petal_length</th>
      <th>petal_length_class</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>140</th>
      <td>5.6</td>
      <td>중</td>
    </tr>
    <tr>
      <th>141</th>
      <td>5.1</td>
      <td>소</td>
    </tr>
    <tr>
      <th>142</th>
      <td>5.1</td>
      <td>소</td>
    </tr>
    <tr>
      <th>143</th>
      <td>5.9</td>
      <td>대</td>
    </tr>
    <tr>
      <th>144</th>
      <td>5.7</td>
      <td>중</td>
    </tr>
    <tr>
      <th>145</th>
      <td>5.2</td>
      <td>소</td>
    </tr>
    <tr>
      <th>146</th>
      <td>5.0</td>
      <td>소</td>
    </tr>
    <tr>
      <th>147</th>
      <td>5.2</td>
      <td>소</td>
    </tr>
    <tr>
      <th>148</th>
      <td>5.4</td>
      <td>중</td>
    </tr>
    <tr>
      <th>149</th>
      <td>5.1</td>
      <td>소</td>
    </tr>
  </tbody>
</table>
</div>



### `pivot_table`

Pandas는 `pivot` 명령과 `groupby` 명령의 중간 성격을 가지는 `pivot_table` 명령도 제공한다.

`pivot_table` 명령은 `groupby` 명령처럼 그룹분석을 하지만 최종적으로는 `pivot` 명령처럼 피봇테이블을 만든다. 즉 `groupby` 명령의 결과에 `unstack`을 자동 적용하여 2차원적인 형태로 변형한다. 사용 방법은 다음과 같다.

- pivot_table(data, values=None, index=None, columns=None, aggfunc='mean', fill_value=None, margins=False, margins_name='All')
- data: 분석할 데이터프레임 (메서드일 때는 필요하지 않음)
- values: 분석할 데이터프레임에서 분석할 열
- index: 행 인덱스로 들어갈 키 열 또는 키 열의 리스트
- columns: 열 인덱스로 들어갈 키 열 또는 키 열의 리스트
- aggfunc: 분석 메서드
- fill_value: NaN 대체 값
- margins: 모든 데이터를 분석한 결과를 오른쪽과 아래에 붙일지 여부
- margins_name: 마진 열(행)의 이름

만약 조건에 따른 데이터가 유일하게 선택되지 않으면 그룹연산을 하며 이 때 `aggfunc` 인수로 정의된 함수를 수행하여 대표값을 계산한다.

`pivot_table`를 메서드로 사용할 때는 객체 자체가 데이터가 되므로 `data` 인수가 필요하지 않다.

예를 들어 위에서 만들었던 피봇테이블은 `pivot_table` 명령으로 다음과 같이 만들 수도 있다. 인수의 순서에 주의해야 한다.


```python
df1.pivot_table("인구", "도시", "연도")
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
      <th>연도</th>
      <th>2005</th>
      <th>2010</th>
      <th>2015</th>
    </tr>
    <tr>
      <th>도시</th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>부산</th>
      <td>3512547.0</td>
      <td>3393191.0</td>
      <td>3448737.0</td>
    </tr>
    <tr>
      <th>서울</th>
      <td>9762546.0</td>
      <td>9631482.0</td>
      <td>9904312.0</td>
    </tr>
    <tr>
      <th>인천</th>
      <td>NaN</td>
      <td>263203.0</td>
      <td>2890451.0</td>
    </tr>
  </tbody>
</table>
</div>



`margins=True` 인수를 주면 `aggfunc`로 주어진 분석 방법을 해당 열의 모든 데이터, 해당 행의 모든 데이터 그리고 전체 데이터에 대해 적용한 결과를 같이 보여준다. `aggfunc`가 주어지지 않았으면 평균을 계산한다.


```python
df1.pivot_table("인구", "도시", "연도", margins=True, margins_name="평균")
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
      <th>연도</th>
      <th>2005</th>
      <th>2010</th>
      <th>2015</th>
      <th>평균</th>
    </tr>
    <tr>
      <th>도시</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>부산</th>
      <td>3512547.0</td>
      <td>3393191.0</td>
      <td>3448737.0</td>
      <td>3.451492e+06</td>
    </tr>
    <tr>
      <th>서울</th>
      <td>9762546.0</td>
      <td>9631482.0</td>
      <td>9904312.0</td>
      <td>9.766113e+06</td>
    </tr>
    <tr>
      <th>인천</th>
      <td>NaN</td>
      <td>263203.0</td>
      <td>2890451.0</td>
      <td>1.576827e+06</td>
    </tr>
    <tr>
      <th>평균</th>
      <td>6637546.5</td>
      <td>4429292.0</td>
      <td>5414500.0</td>
      <td>5.350809e+06</td>
    </tr>
  </tbody>
</table>
</div>



이 결과에서 가장 오른쪽 합계 열의 첫번째 값 3451492은 모든 부산 인구 데이터의 평균, 두번째 값 9766113은 모든 서울 인구 데이터의 평균이다. 가장 아래의 합계 행의 첫번째 값은 2005년 데이터의 평균값, 두번째 값은 2010년 데이터의 평균값이다. 가장 오른쪽 아래의 값 5350809는 전체 데이터의 평균값이다. 다음 계산을 통해 이를 확인할 수 있다.


```python
df1["인구"].mean()
```




    5350808.625



행 인덱스나 열 인덱스에 리스트를 넣으면 다중 인덱스 테이블을 만든다.


```python
df1.pivot_table("인구", index=["연도", "도시"])
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
      <th></th>
      <th>인구</th>
    </tr>
    <tr>
      <th>연도</th>
      <th>도시</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="2" valign="top">2005</th>
      <th>부산</th>
      <td>3512547</td>
    </tr>
    <tr>
      <th>서울</th>
      <td>9762546</td>
    </tr>
    <tr>
      <th rowspan="3" valign="top">2010</th>
      <th>부산</th>
      <td>3393191</td>
    </tr>
    <tr>
      <th>서울</th>
      <td>9631482</td>
    </tr>
    <tr>
      <th>인천</th>
      <td>263203</td>
    </tr>
    <tr>
      <th rowspan="3" valign="top">2015</th>
      <th>부산</th>
      <td>3448737</td>
    </tr>
    <tr>
      <th>서울</th>
      <td>9904312</td>
    </tr>
    <tr>
      <th>인천</th>
      <td>2890451</td>
    </tr>
  </tbody>
</table>
</div>



식당에서 식사 후 내는 팁(tip)과 관련된 데이터를 이용하여 좀더 구체적으로 그룹분석 방법을 살펴본다. 우선 Seaborn 패키지에 설치된 샘플 데이터를 로드한다. 이 데이터프레임에서 각각의 컬럼은 다음을 뜻한다.

- total_bill: 식사대금
- tip: 팁
- sex: 성별
- smoker: 흡연/금연 여부
- day: 요일
- time: 시간
- size: 인원


```python
tips = sns.load_dataset('tips')
tips.tail()
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
      <th>total_bill</th>
      <th>tip</th>
      <th>sex</th>
      <th>smoker</th>
      <th>day</th>
      <th>time</th>
      <th>size</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>239</th>
      <td>29.03</td>
      <td>5.92</td>
      <td>Male</td>
      <td>No</td>
      <td>Sat</td>
      <td>Dinner</td>
      <td>3</td>
    </tr>
    <tr>
      <th>240</th>
      <td>27.18</td>
      <td>2.00</td>
      <td>Female</td>
      <td>Yes</td>
      <td>Sat</td>
      <td>Dinner</td>
      <td>2</td>
    </tr>
    <tr>
      <th>241</th>
      <td>22.67</td>
      <td>2.00</td>
      <td>Male</td>
      <td>Yes</td>
      <td>Sat</td>
      <td>Dinner</td>
      <td>2</td>
    </tr>
    <tr>
      <th>242</th>
      <td>17.82</td>
      <td>1.75</td>
      <td>Male</td>
      <td>No</td>
      <td>Sat</td>
      <td>Dinner</td>
      <td>2</td>
    </tr>
    <tr>
      <th>243</th>
      <td>18.78</td>
      <td>3.00</td>
      <td>Female</td>
      <td>No</td>
      <td>Thur</td>
      <td>Dinner</td>
      <td>2</td>
    </tr>
  </tbody>
</table>
</div>



분석의 목표는 식사 대금 대비 팁의 비율이 어떤 경우에 가장 높아지지는 찾는 것이다. 우선 식사대금와 팁의 비율을 나타내는 `tip_pct`를 추가하자.


```python
tips["tip_pct"] = tips["tip"] / tips["total_bill"]
tips.tail()
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
      <th>total_bill</th>
      <th>tip</th>
      <th>sex</th>
      <th>smoker</th>
      <th>day</th>
      <th>time</th>
      <th>size</th>
      <th>tip_pct</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>239</th>
      <td>29.03</td>
      <td>5.92</td>
      <td>Male</td>
      <td>No</td>
      <td>Sat</td>
      <td>Dinner</td>
      <td>3</td>
      <td>0.203927</td>
    </tr>
    <tr>
      <th>240</th>
      <td>27.18</td>
      <td>2.00</td>
      <td>Female</td>
      <td>Yes</td>
      <td>Sat</td>
      <td>Dinner</td>
      <td>2</td>
      <td>0.073584</td>
    </tr>
    <tr>
      <th>241</th>
      <td>22.67</td>
      <td>2.00</td>
      <td>Male</td>
      <td>Yes</td>
      <td>Sat</td>
      <td>Dinner</td>
      <td>2</td>
      <td>0.088222</td>
    </tr>
    <tr>
      <th>242</th>
      <td>17.82</td>
      <td>1.75</td>
      <td>Male</td>
      <td>No</td>
      <td>Sat</td>
      <td>Dinner</td>
      <td>2</td>
      <td>0.098204</td>
    </tr>
    <tr>
      <th>243</th>
      <td>18.78</td>
      <td>3.00</td>
      <td>Female</td>
      <td>No</td>
      <td>Thur</td>
      <td>Dinner</td>
      <td>2</td>
      <td>0.159744</td>
    </tr>
  </tbody>
</table>
</div>



다음으로 각 열의 데이터에 대해 간단히 분포를 알아본다.


```python
tips.describe()
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
      <th>total_bill</th>
      <th>tip</th>
      <th>size</th>
      <th>tip_pct</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>count</th>
      <td>244.000000</td>
      <td>244.000000</td>
      <td>244.000000</td>
      <td>244.000000</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>19.785943</td>
      <td>2.998279</td>
      <td>2.569672</td>
      <td>0.160803</td>
    </tr>
    <tr>
      <th>std</th>
      <td>8.902412</td>
      <td>1.383638</td>
      <td>0.951100</td>
      <td>0.061072</td>
    </tr>
    <tr>
      <th>min</th>
      <td>3.070000</td>
      <td>1.000000</td>
      <td>1.000000</td>
      <td>0.035638</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>13.347500</td>
      <td>2.000000</td>
      <td>2.000000</td>
      <td>0.129127</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>17.795000</td>
      <td>2.900000</td>
      <td>2.000000</td>
      <td>0.154770</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>24.127500</td>
      <td>3.562500</td>
      <td>3.000000</td>
      <td>0.191475</td>
    </tr>
    <tr>
      <th>max</th>
      <td>50.810000</td>
      <td>10.000000</td>
      <td>6.000000</td>
      <td>0.710345</td>
    </tr>
  </tbody>
</table>
</div>



우선 성별로 나누어 데이터 갯수를 세어보자


```python
tips.groupby('sex').count()
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
      <th>total_bill</th>
      <th>tip</th>
      <th>smoker</th>
      <th>day</th>
      <th>time</th>
      <th>size</th>
      <th>tip_pct</th>
    </tr>
    <tr>
      <th>sex</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Male</th>
      <td>157</td>
      <td>157</td>
      <td>157</td>
      <td>157</td>
      <td>157</td>
      <td>157</td>
      <td>157</td>
    </tr>
    <tr>
      <th>Female</th>
      <td>87</td>
      <td>87</td>
      <td>87</td>
      <td>87</td>
      <td>87</td>
      <td>87</td>
      <td>87</td>
    </tr>
  </tbody>
</table>
</div>



데이터 갯수의 경우 NaN 데이터가 없다면 모두 같은 값이 나올 것이다. 이 때는 `size` 명령을 사용하면 더 간단히 표시된다. `size` 명령은 NaN이 있어도 상관하지 않는다.


```python
tips.groupby('sex').size()
```




    sex
    Male      157
    Female     87
    dtype: int64



이번에는 성별과 흡연유무로 나누어 데이터 갯수를 알아보자.


```python
tips.groupby(["sex", "smoker"]).size()
```




    sex     smoker
    Male    Yes       60
            No        97
    Female  Yes       33
            No        54
    dtype: int64



좀더 보기 좋게 피봇 테이블 형태로 바꿀 수도 있다.


```python
tips.pivot_table("tip_pct", "sex", "smoker", aggfunc="count", margins=True)
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
      <th>smoker</th>
      <th>Yes</th>
      <th>No</th>
      <th>All</th>
    </tr>
    <tr>
      <th>sex</th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Male</th>
      <td>60</td>
      <td>97</td>
      <td>157</td>
    </tr>
    <tr>
      <th>Female</th>
      <td>33</td>
      <td>54</td>
      <td>87</td>
    </tr>
    <tr>
      <th>All</th>
      <td>93</td>
      <td>151</td>
      <td>244</td>
    </tr>
  </tbody>
</table>
</div>



이제 성별과 흡연 여부에 따른 평균 팁 비율을 살펴보자


```python
tips.groupby("sex")[["tip_pct"]].mean()
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
      <th>tip_pct</th>
    </tr>
    <tr>
      <th>sex</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Male</th>
      <td>0.157651</td>
    </tr>
    <tr>
      <th>Female</th>
      <td>0.166491</td>
    </tr>
  </tbody>
</table>
</div>




```python
tips.groupby("smoker")[["tip_pct"]].mean()

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
      <th>tip_pct</th>
    </tr>
    <tr>
      <th>smoker</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Yes</th>
      <td>0.163196</td>
    </tr>
    <tr>
      <th>No</th>
      <td>0.159328</td>
    </tr>
  </tbody>
</table>
</div>



`pivot_table` 명령을 사용할 수도 있다.


```python
tips.pivot_table("tip_pct", "sex")
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
      <th>tip_pct</th>
    </tr>
    <tr>
      <th>sex</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Male</th>
      <td>0.157651</td>
    </tr>
    <tr>
      <th>Female</th>
      <td>0.166491</td>
    </tr>
  </tbody>
</table>
</div>




```python
tips.pivot_table("tip_pct", ["sex", "smoker"])
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
      <th></th>
      <th>tip_pct</th>
    </tr>
    <tr>
      <th>sex</th>
      <th>smoker</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="2" valign="top">Male</th>
      <th>Yes</th>
      <td>0.152771</td>
    </tr>
    <tr>
      <th>No</th>
      <td>0.160669</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">Female</th>
      <th>Yes</th>
      <td>0.182150</td>
    </tr>
    <tr>
      <th>No</th>
      <td>0.156921</td>
    </tr>
  </tbody>
</table>
</div>




```python
tips.pivot_table("tip_pct", "sex", "smoker")
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
      <th>smoker</th>
      <th>Yes</th>
      <th>No</th>
    </tr>
    <tr>
      <th>sex</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Male</th>
      <td>0.152771</td>
      <td>0.160669</td>
    </tr>
    <tr>
      <th>Female</th>
      <td>0.182150</td>
      <td>0.156921</td>
    </tr>
  </tbody>
</table>
</div>



여성 혹은 흡연자의 팁 비율이 높은 것을 볼 수 있다. 하지만 이 데이터에는 평균을 제외한 분산(variance) 등의 다른 통계값이 없으므로 `describe` 명령으로 여러가지 통계값을 한 번에 알아본다.


```python
tips.groupby("sex")[["tip_pct"]].describe()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead tr th {
        text-align: left;
    }

    .dataframe thead tr:last-of-type th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr>
      <th></th>
      <th colspan="8" halign="left">tip_pct</th>
    </tr>
    <tr>
      <th></th>
      <th>count</th>
      <th>mean</th>
      <th>std</th>
      <th>min</th>
      <th>25%</th>
      <th>50%</th>
      <th>75%</th>
      <th>max</th>
    </tr>
    <tr>
      <th>sex</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Male</th>
      <td>157.0</td>
      <td>0.157651</td>
      <td>0.064778</td>
      <td>0.035638</td>
      <td>0.121389</td>
      <td>0.153492</td>
      <td>0.186240</td>
      <td>0.710345</td>
    </tr>
    <tr>
      <th>Female</th>
      <td>87.0</td>
      <td>0.166491</td>
      <td>0.053632</td>
      <td>0.056433</td>
      <td>0.140416</td>
      <td>0.155581</td>
      <td>0.194266</td>
      <td>0.416667</td>
    </tr>
  </tbody>
</table>
</div>




```python
tips.groupby("smoker")[["tip_pct"]].describe()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead tr th {
        text-align: left;
    }

    .dataframe thead tr:last-of-type th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr>
      <th></th>
      <th colspan="8" halign="left">tip_pct</th>
    </tr>
    <tr>
      <th></th>
      <th>count</th>
      <th>mean</th>
      <th>std</th>
      <th>min</th>
      <th>25%</th>
      <th>50%</th>
      <th>75%</th>
      <th>max</th>
    </tr>
    <tr>
      <th>smoker</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Yes</th>
      <td>93.0</td>
      <td>0.163196</td>
      <td>0.085119</td>
      <td>0.035638</td>
      <td>0.106771</td>
      <td>0.153846</td>
      <td>0.195059</td>
      <td>0.710345</td>
    </tr>
    <tr>
      <th>No</th>
      <td>151.0</td>
      <td>0.159328</td>
      <td>0.039910</td>
      <td>0.056797</td>
      <td>0.136906</td>
      <td>0.155625</td>
      <td>0.185014</td>
      <td>0.291990</td>
    </tr>
  </tbody>
</table>
</div>




```python
tips.groupby(["sex", "smoker"])[["tip_pct"]].describe()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead tr th {
        text-align: left;
    }

    .dataframe thead tr:last-of-type th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr>
      <th></th>
      <th></th>
      <th colspan="8" halign="left">tip_pct</th>
    </tr>
    <tr>
      <th></th>
      <th></th>
      <th>count</th>
      <th>mean</th>
      <th>std</th>
      <th>min</th>
      <th>25%</th>
      <th>50%</th>
      <th>75%</th>
      <th>max</th>
    </tr>
    <tr>
      <th>sex</th>
      <th>smoker</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="2" valign="top">Male</th>
      <th>Yes</th>
      <td>60.0</td>
      <td>0.152771</td>
      <td>0.090588</td>
      <td>0.035638</td>
      <td>0.101845</td>
      <td>0.141015</td>
      <td>0.191697</td>
      <td>0.710345</td>
    </tr>
    <tr>
      <th>No</th>
      <td>97.0</td>
      <td>0.160669</td>
      <td>0.041849</td>
      <td>0.071804</td>
      <td>0.131810</td>
      <td>0.157604</td>
      <td>0.186220</td>
      <td>0.291990</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">Female</th>
      <th>Yes</th>
      <td>33.0</td>
      <td>0.182150</td>
      <td>0.071595</td>
      <td>0.056433</td>
      <td>0.152439</td>
      <td>0.173913</td>
      <td>0.198216</td>
      <td>0.416667</td>
    </tr>
    <tr>
      <th>No</th>
      <td>54.0</td>
      <td>0.156921</td>
      <td>0.036421</td>
      <td>0.056797</td>
      <td>0.139708</td>
      <td>0.149691</td>
      <td>0.181630</td>
      <td>0.252672</td>
    </tr>
  </tbody>
</table>
</div>



이번에는 각 그룹에서 가장 많은 팁과 가장 적은 팁의 차이를 알아보자. 이 계산을 해 줄 수 있는 그룹연산 함수가 없으므로 함수를 직접 만들고 `agg`메서드를 사용한다.


```python
def peak_to_peak(x):
    return x.max() - x.min()

tips.groupby(["sex", "smoker"])[["tip"]].agg(peak_to_peak)
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
      <th></th>
      <th>tip</th>
    </tr>
    <tr>
      <th>sex</th>
      <th>smoker</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="2" valign="top">Male</th>
      <th>Yes</th>
      <td>9.00</td>
    </tr>
    <tr>
      <th>No</th>
      <td>7.75</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">Female</th>
      <th>Yes</th>
      <td>5.50</td>
    </tr>
    <tr>
      <th>No</th>
      <td>4.20</td>
    </tr>
  </tbody>
</table>
</div>



만약 여러가지 그룹연산을 동시에 하고 싶다면 다음과 같이 리스트를 이용한다.


```python
tips.groupby(["sex", "smoker"]).agg(["mean", peak_to_peak])[["total_bill"]]
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead tr th {
        text-align: left;
    }

    .dataframe thead tr:last-of-type th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr>
      <th></th>
      <th></th>
      <th colspan="2" halign="left">total_bill</th>
    </tr>
    <tr>
      <th></th>
      <th></th>
      <th>mean</th>
      <th>peak_to_peak</th>
    </tr>
    <tr>
      <th>sex</th>
      <th>smoker</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="2" valign="top">Male</th>
      <th>Yes</th>
      <td>22.284500</td>
      <td>43.56</td>
    </tr>
    <tr>
      <th>No</th>
      <td>19.791237</td>
      <td>40.82</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">Female</th>
      <th>Yes</th>
      <td>17.977879</td>
      <td>41.23</td>
    </tr>
    <tr>
      <th>No</th>
      <td>18.105185</td>
      <td>28.58</td>
    </tr>
  </tbody>
</table>
</div>



만약 데이터 열마다 다른 연산을 하고 싶다면 열 라벨과 연산 이름(또는 함수)를 딕셔너리로 넣는다.


```python
tips.groupby(["sex", "smoker"]).agg({'tip_pct': 'mean', 'total_bill':peak_to_peak})
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
      <th></th>
      <th>tip_pct</th>
      <th>total_bill</th>
    </tr>
    <tr>
      <th>sex</th>
      <th>smoker</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="2" valign="top">Male</th>
      <th>Yes</th>
      <td>0.152771</td>
      <td>43.56</td>
    </tr>
    <tr>
      <th>No</th>
      <td>0.160669</td>
      <td>40.82</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">Female</th>
      <th>Yes</th>
      <td>0.182150</td>
      <td>41.23</td>
    </tr>
    <tr>
      <th>No</th>
      <td>0.156921</td>
      <td>28.58</td>
    </tr>
  </tbody>
</table>
</div>



다음은 `pivot_table` 명령으로 더 복잡한 분석을 한 예이다.


```python
tips.pivot_table(['tip_pct', 'size'], ['sex', 'day'], 'smoker')
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead tr th {
        text-align: left;
    }

    .dataframe thead tr:last-of-type th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr>
      <th></th>
      <th></th>
      <th colspan="2" halign="left">size</th>
      <th colspan="2" halign="left">tip_pct</th>
    </tr>
    <tr>
      <th></th>
      <th>smoker</th>
      <th>Yes</th>
      <th>No</th>
      <th>Yes</th>
      <th>No</th>
    </tr>
    <tr>
      <th>sex</th>
      <th>day</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="4" valign="top">Male</th>
      <th>Thur</th>
      <td>2.300000</td>
      <td>2.500000</td>
      <td>0.164417</td>
      <td>0.165706</td>
    </tr>
    <tr>
      <th>Fri</th>
      <td>2.125000</td>
      <td>2.000000</td>
      <td>0.144730</td>
      <td>0.138005</td>
    </tr>
    <tr>
      <th>Sat</th>
      <td>2.629630</td>
      <td>2.656250</td>
      <td>0.139067</td>
      <td>0.162132</td>
    </tr>
    <tr>
      <th>Sun</th>
      <td>2.600000</td>
      <td>2.883721</td>
      <td>0.173964</td>
      <td>0.158291</td>
    </tr>
    <tr>
      <th rowspan="4" valign="top">Female</th>
      <th>Thur</th>
      <td>2.428571</td>
      <td>2.480000</td>
      <td>0.163073</td>
      <td>0.155971</td>
    </tr>
    <tr>
      <th>Fri</th>
      <td>2.000000</td>
      <td>2.500000</td>
      <td>0.209129</td>
      <td>0.165296</td>
    </tr>
    <tr>
      <th>Sat</th>
      <td>2.200000</td>
      <td>2.307692</td>
      <td>0.163817</td>
      <td>0.147993</td>
    </tr>
    <tr>
      <th>Sun</th>
      <td>2.500000</td>
      <td>3.071429</td>
      <td>0.237075</td>
      <td>0.165710</td>
    </tr>
  </tbody>
</table>
</div>




```python
tips.pivot_table('size', ['time', 'sex', 'smoker'], 'day', aggfunc='sum', fill_value=0)
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
      <th></th>
      <th>day</th>
      <th>Thur</th>
      <th>Fri</th>
      <th>Sat</th>
      <th>Sun</th>
    </tr>
    <tr>
      <th>time</th>
      <th>sex</th>
      <th>smoker</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="4" valign="top">Lunch</th>
      <th rowspan="2" valign="top">Male</th>
      <th>Yes</th>
      <td>23</td>
      <td>5</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>No</th>
      <td>50</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">Female</th>
      <th>Yes</th>
      <td>17</td>
      <td>6</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>No</th>
      <td>60</td>
      <td>3</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th rowspan="4" valign="top">Dinner</th>
      <th rowspan="2" valign="top">Male</th>
      <th>Yes</th>
      <td>0</td>
      <td>12</td>
      <td>71</td>
      <td>39</td>
    </tr>
    <tr>
      <th>No</th>
      <td>0</td>
      <td>4</td>
      <td>85</td>
      <td>124</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">Female</th>
      <th>Yes</th>
      <td>0</td>
      <td>8</td>
      <td>33</td>
      <td>10</td>
    </tr>
    <tr>
      <th>No</th>
      <td>2</td>
      <td>2</td>
      <td>30</td>
      <td>43</td>
    </tr>
  </tbody>
</table>
</div>

피봇테이블과 그룹연산에 대해 알아 보았다. 분석 연습을 해보기 위해 자주 사용되는 타이타닉 승객데이터를 이용해서 연습 해보면 좋을 것 같다.

`titanic = sns.load_dataset("titanic")`

출처 : 데이터사이언스 스쿨(http://datascienceschool.net)
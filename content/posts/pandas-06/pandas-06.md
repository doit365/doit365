---
title: "DataFrame 합성"
path: "/pandas-06"
tags: ["Python"]
featuredImage: "./cover.png"
excerpt: Pandas는 두 개 이상의 DataFrame을 하나로 합치는 데이터 병합(merge)이나 연결(concatenate)을 지원한다.
created: 2020-10-09
updated: 2020-10-09
---

Pandas는 두 개 이상의 DataFrame을 하나로 합치는 데이터 병합(merge)이나 연결(concatenate)을 지원한다.

## `merge` 함수를 사용한 DataFrame 병합

`merge` 함수는 두 데이터프레임의 공통 열 혹은 인덱스를 기준으로 두 개의 테이블을 합친다. 이 때 기준이 되는 열, 행의 데이터를 키(Key)라고 한다.


```python
import pandas as pd 
df1 = pd.DataFrame({
    '고객번호': [1001, 1002, 1003, 1004, 1005, 1006, 1007],
    '이름': ['둘리', '도우너', '또치', '길동', '마이콜', '희동', '영희']
}, columns=['고객번호', '이름'])
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
      <th>고객번호</th>
      <th>이름</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1001</td>
      <td>둘리</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1002</td>
      <td>도우너</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1003</td>
      <td>또치</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1004</td>
      <td>길동</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1005</td>
      <td>마이콜</td>
    </tr>
    <tr>
      <th>5</th>
      <td>1006</td>
      <td>희동</td>
    </tr>
    <tr>
      <th>6</th>
      <td>1007</td>
      <td>영희</td>
    </tr>
  </tbody>
</table>
</div>




```python
df2 = pd.DataFrame({
    '고객번호': [1001, 1001, 1005, 1006, 1008, 1001],
    '금액': [10000, 20000, 15000, 5000, 100000, 30000]
}, columns=['고객번호', '금액'])
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
      <th>고객번호</th>
      <th>금액</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1001</td>
      <td>10000</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1001</td>
      <td>20000</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1005</td>
      <td>15000</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1006</td>
      <td>5000</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1008</td>
      <td>100000</td>
    </tr>
    <tr>
      <th>5</th>
      <td>1001</td>
      <td>30000</td>
    </tr>
  </tbody>
</table>
</div>



`merge` 함수로 위의 두 데이터프레임 df1, df2 를 합치면 공통열인 `고객번호` 열을 기준으로 데이터를 찾아서 합친다. 이 때 기본적으로는 양쪽 데이터프레임에 모두 키가 존재하는 데이터만 보여주는 inner join 방식을 사용한다.


```python
pd.merge(df1, df2)
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
      <th>고객번호</th>
      <th>이름</th>
      <th>금액</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1001</td>
      <td>둘리</td>
      <td>10000</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1001</td>
      <td>둘리</td>
      <td>20000</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1001</td>
      <td>둘리</td>
      <td>30000</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1005</td>
      <td>마이콜</td>
      <td>15000</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1006</td>
      <td>희동</td>
      <td>5000</td>
    </tr>
  </tbody>
</table>
</div>



outer join 방식은 키 값이 한쪽에만 있어도 데이터를 보여준다.


```python
pd.merge(df1, df2, how='outer')
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
      <th>고객번호</th>
      <th>이름</th>
      <th>금액</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1001</td>
      <td>둘리</td>
      <td>10000.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1001</td>
      <td>둘리</td>
      <td>20000.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1001</td>
      <td>둘리</td>
      <td>30000.0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1002</td>
      <td>도우너</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1003</td>
      <td>또치</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>5</th>
      <td>1004</td>
      <td>길동</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>6</th>
      <td>1005</td>
      <td>마이콜</td>
      <td>15000.0</td>
    </tr>
    <tr>
      <th>7</th>
      <td>1006</td>
      <td>희동</td>
      <td>5000.0</td>
    </tr>
    <tr>
      <th>8</th>
      <td>1007</td>
      <td>영희</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>9</th>
      <td>1008</td>
      <td>NaN</td>
      <td>100000.0</td>
    </tr>
  </tbody>
</table>
</div>



left, right 방식은 각각 첫번째, 혹은 두번째 데이터프레임의 키 앖을 모두 보여준다.


```python
pd.merge(df1, df2, how='left')
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
      <th>고객번호</th>
      <th>이름</th>
      <th>금액</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1001</td>
      <td>둘리</td>
      <td>10000.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1001</td>
      <td>둘리</td>
      <td>20000.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1001</td>
      <td>둘리</td>
      <td>30000.0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1002</td>
      <td>도우너</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1003</td>
      <td>또치</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>5</th>
      <td>1004</td>
      <td>길동</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>6</th>
      <td>1005</td>
      <td>마이콜</td>
      <td>15000.0</td>
    </tr>
    <tr>
      <th>7</th>
      <td>1006</td>
      <td>희동</td>
      <td>5000.0</td>
    </tr>
    <tr>
      <th>8</th>
      <td>1007</td>
      <td>영희</td>
      <td>NaN</td>
    </tr>
  </tbody>
</table>
</div>




```python
pd.merge(df1, df2, how='right')
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
      <th>고객번호</th>
      <th>이름</th>
      <th>금액</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1001</td>
      <td>둘리</td>
      <td>10000</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1001</td>
      <td>둘리</td>
      <td>20000</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1001</td>
      <td>둘리</td>
      <td>30000</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1005</td>
      <td>마이콜</td>
      <td>15000</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1006</td>
      <td>희동</td>
      <td>5000</td>
    </tr>
    <tr>
      <th>5</th>
      <td>1008</td>
      <td>NaN</td>
      <td>100000</td>
    </tr>
  </tbody>
</table>
</div>



만약 테이블에 키 값이 같은 데이터가 여러개 있는 경우에는 있을 수 있는 모든 경우의 수를 따져서 조합을 만들어 낸다.


```python
df1 = pd.DataFrame({
    '품종': ['setosa', 'setosa', 'virginica', 'virginica'],
    '꽃잎길이': [1.4, 1.3, 1.5, 1.3]
}, columns=['품종', '꽃잎길이'])
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
      <th>품종</th>
      <th>꽃잎길이</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>setosa</td>
      <td>1.4</td>
    </tr>
    <tr>
      <th>1</th>
      <td>setosa</td>
      <td>1.3</td>
    </tr>
    <tr>
      <th>2</th>
      <td>virginica</td>
      <td>1.5</td>
    </tr>
    <tr>
      <th>3</th>
      <td>virginica</td>
      <td>1.3</td>
    </tr>
  </tbody>
</table>
</div>




```python
df2 = pd.DataFrame({
    '품종': ['setosa', 'virginica', 'virginica', 'versicolor'],
    '꽃잎너비': [0.4, 0.3, 0.5, 0.3]},
    columns=['품종', '꽃잎너비'])
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
      <th>품종</th>
      <th>꽃잎너비</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>setosa</td>
      <td>0.4</td>
    </tr>
    <tr>
      <th>1</th>
      <td>virginica</td>
      <td>0.3</td>
    </tr>
    <tr>
      <th>2</th>
      <td>virginica</td>
      <td>0.5</td>
    </tr>
    <tr>
      <th>3</th>
      <td>versicolor</td>
      <td>0.3</td>
    </tr>
  </tbody>
</table>
</div>



이 데이터에서 키 값 setosa에 대해 왼쪽 데이터프레임에는 1.4와 1.3 이라는 2개의 데이터, 오른쪽 데이터프레임에는 0.4라는 1개의 데이터가 있으므로 병합된 데이터에는 setosa가 (1.4, 0.4), (1.3, 0.4) 두 개의 데이터가 생긴다. 키값 virginica의 경우에는 왼쪽 데이터프레임에 1.5와 1.3이라는 2개의 데이터, 오른쪽 데이터프레임에 0.3와 0.5라는 2개의 데이터가 있으므로 2개와 2개의 조합에 의해 4가지 값이 생긴다.


```python
pd.merge(df1, df2)
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
      <th>품종</th>
      <th>꽃잎길이</th>
      <th>꽃잎너비</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>setosa</td>
      <td>1.4</td>
      <td>0.4</td>
    </tr>
    <tr>
      <th>1</th>
      <td>setosa</td>
      <td>1.3</td>
      <td>0.4</td>
    </tr>
    <tr>
      <th>2</th>
      <td>virginica</td>
      <td>1.5</td>
      <td>0.3</td>
    </tr>
    <tr>
      <th>3</th>
      <td>virginica</td>
      <td>1.5</td>
      <td>0.5</td>
    </tr>
    <tr>
      <th>4</th>
      <td>virginica</td>
      <td>1.3</td>
      <td>0.3</td>
    </tr>
    <tr>
      <th>5</th>
      <td>virginica</td>
      <td>1.3</td>
      <td>0.5</td>
    </tr>
  </tbody>
</table>
</div>



두 데이터프레임에서 이름이 같은 열은 모두 키가 된다. 만약 이름이 같아도 키가 되면 안되는 열이 있다면 `on`인수로 기준열을 명시해야 한다. 다음 예에서 첫번째 데이터프레임의 **데이터**는 실제로는 금액을 나타내는 데이터 이고 두번째 데이터프레임의 **데이터**는 실제로 성별을 나타내는 데이터이므로 이름이 같아도 다른 데이터이다. 따라서 이 열은 기준열이 되면 안된다.


```python
df1 = pd.DataFrame({
    '고객명': ['춘향', '춘향', '몽룡'],
    '날짜': ['2018-01-01', '2018-01-02', '2018-01-01'],
    '데이터': ['20000', '30000', '100000']})
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
      <th>고객명</th>
      <th>날짜</th>
      <th>데이터</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>춘향</td>
      <td>2018-01-01</td>
      <td>20000</td>
    </tr>
    <tr>
      <th>1</th>
      <td>춘향</td>
      <td>2018-01-02</td>
      <td>30000</td>
    </tr>
    <tr>
      <th>2</th>
      <td>몽룡</td>
      <td>2018-01-01</td>
      <td>100000</td>
    </tr>
  </tbody>
</table>
</div>




```python
df2 = pd.DataFrame({
    '고객명': ['춘향', '몽룡'],
    '데이터': ['여자', '남자']})
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
      <th>고객명</th>
      <th>데이터</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>춘향</td>
      <td>여자</td>
    </tr>
    <tr>
      <th>1</th>
      <td>몽룡</td>
      <td>남자</td>
    </tr>
  </tbody>
</table>
</div>




```python
pd.merge(df1, df2, on='고객명')
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
      <th>고객명</th>
      <th>날짜</th>
      <th>데이터_x</th>
      <th>데이터_y</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>춘향</td>
      <td>2018-01-01</td>
      <td>20000</td>
      <td>여자</td>
    </tr>
    <tr>
      <th>1</th>
      <td>춘향</td>
      <td>2018-01-02</td>
      <td>30000</td>
      <td>여자</td>
    </tr>
    <tr>
      <th>2</th>
      <td>몽룡</td>
      <td>2018-01-01</td>
      <td>100000</td>
      <td>남자</td>
    </tr>
  </tbody>
</table>
</div>



이 때 기준 열이 아니면서 이름이 같은 열에는 `_x` 또는 `_y`와 같은 접미사가 붙는다.

반대로 키가 되는 기준열의 이름이 두 데이터프레임에서 다르면 `left_on`, `right_on` 인수를 사용하여 기준열을 명시해야 한다.


```python
df1 = pd.DataFrame({
    '이름': ['영희', '철수', '철수'],
    '성정': [1,2,3]
})
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
      <th>이름</th>
      <th>성정</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>영희</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>철수</td>
      <td>2</td>
    </tr>
    <tr>
      <th>2</th>
      <td>철수</td>
      <td>3</td>
    </tr>
  </tbody>
</table>
</div>




```python
df2 = pd.DataFrame({
    '성명': ['영희', '영희', '철수'],
    '성적2': [4, 5, 6]})
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
      <th>성명</th>
      <th>성적2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>영희</td>
      <td>4</td>
    </tr>
    <tr>
      <th>1</th>
      <td>영희</td>
      <td>5</td>
    </tr>
    <tr>
      <th>2</th>
      <td>철수</td>
      <td>6</td>
    </tr>
  </tbody>
</table>
</div>




```python
pd.merge(df1, df2, left_on='이름', right_on='성명')
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
      <th>이름</th>
      <th>성정</th>
      <th>성명</th>
      <th>성적2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>영희</td>
      <td>1</td>
      <td>영희</td>
      <td>4</td>
    </tr>
    <tr>
      <th>1</th>
      <td>영희</td>
      <td>1</td>
      <td>영희</td>
      <td>5</td>
    </tr>
    <tr>
      <th>2</th>
      <td>철수</td>
      <td>2</td>
      <td>철수</td>
      <td>6</td>
    </tr>
    <tr>
      <th>3</th>
      <td>철수</td>
      <td>3</td>
      <td>철수</td>
      <td>6</td>
    </tr>
  </tbody>
</table>
</div>



일반 데이터 열이 아닌 인덱스를 기준열로 사용하여면 `left_index` 또는 `right_index` 인수를 `True`로 설정한다.


```python
df1 = pd.DataFrame({
    '도시': ['서울', '서울', '서울', '부산', '부산'],
    '연도': [2000, 2005, 2010, 2000, 2005],
    '인구': [9853972, 9762546, 9631482, 3655437, 3512547]})
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
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>서울</td>
      <td>2000</td>
      <td>9853972</td>
    </tr>
    <tr>
      <th>1</th>
      <td>서울</td>
      <td>2005</td>
      <td>9762546</td>
    </tr>
    <tr>
      <th>2</th>
      <td>서울</td>
      <td>2010</td>
      <td>9631482</td>
    </tr>
    <tr>
      <th>3</th>
      <td>부산</td>
      <td>2000</td>
      <td>3655437</td>
    </tr>
    <tr>
      <th>4</th>
      <td>부산</td>
      <td>2005</td>
      <td>3512547</td>
    </tr>
  </tbody>
</table>
</div>




```python
import numpy as np
df2 = pd.DataFrame(
    np.arange(12).reshape((6, 2)),
    index=[['부산', '부산', '서울', '서울', '서울', '서울'],
           [2000, 2005, 2000, 2005, 2010, 2015]],
    columns=['데이터1', '데이터2'])
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
      <th></th>
      <th>데이터1</th>
      <th>데이터2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="2" valign="top">부산</th>
      <th>2000</th>
      <td>0</td>
      <td>1</td>
    </tr>
    <tr>
      <th>2005</th>
      <td>2</td>
      <td>3</td>
    </tr>
    <tr>
      <th rowspan="4" valign="top">서울</th>
      <th>2000</th>
      <td>4</td>
      <td>5</td>
    </tr>
    <tr>
      <th>2005</th>
      <td>6</td>
      <td>7</td>
    </tr>
    <tr>
      <th>2010</th>
      <td>8</td>
      <td>9</td>
    </tr>
    <tr>
      <th>2015</th>
      <td>10</td>
      <td>11</td>
    </tr>
  </tbody>
</table>
</div>




```python
pd.merge(df1, df2, left_on=['도시', '연도'], right_index=True)
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
      <th>데이터1</th>
      <th>데이터2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>서울</td>
      <td>2000</td>
      <td>9853972</td>
      <td>4</td>
      <td>5</td>
    </tr>
    <tr>
      <th>1</th>
      <td>서울</td>
      <td>2005</td>
      <td>9762546</td>
      <td>6</td>
      <td>7</td>
    </tr>
    <tr>
      <th>2</th>
      <td>서울</td>
      <td>2010</td>
      <td>9631482</td>
      <td>8</td>
      <td>9</td>
    </tr>
    <tr>
      <th>3</th>
      <td>부산</td>
      <td>2000</td>
      <td>3655437</td>
      <td>0</td>
      <td>1</td>
    </tr>
    <tr>
      <th>4</th>
      <td>부산</td>
      <td>2005</td>
      <td>3512547</td>
      <td>2</td>
      <td>3</td>
    </tr>
  </tbody>
</table>
</div>




```python
df1 = pd.DataFrame(
    [[1., 2.], [3., 4.], [5., 6.]],
    index=['a', 'c', 'e'],
    columns=['서울', '부산'])
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
      <th>서울</th>
      <th>부산</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>a</th>
      <td>1.0</td>
      <td>2.0</td>
    </tr>
    <tr>
      <th>c</th>
      <td>3.0</td>
      <td>4.0</td>
    </tr>
    <tr>
      <th>e</th>
      <td>5.0</td>
      <td>6.0</td>
    </tr>
  </tbody>
</table>
</div>




```python
df2 = pd.DataFrame(
    [[7., 8.], [9., 10.], [11., 12.], [13, 14]],
    index=['b', 'c', 'd', 'e'],
    columns=['대구', '광주'])
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
      <th>대구</th>
      <th>광주</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>b</th>
      <td>7.0</td>
      <td>8.0</td>
    </tr>
    <tr>
      <th>c</th>
      <td>9.0</td>
      <td>10.0</td>
    </tr>
    <tr>
      <th>d</th>
      <td>11.0</td>
      <td>12.0</td>
    </tr>
    <tr>
      <th>e</th>
      <td>13.0</td>
      <td>14.0</td>
    </tr>
  </tbody>
</table>
</div>




```python
pd.merge(df1, df2, how='outer', left_index=True, right_index=True)
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
      <th>서울</th>
      <th>부산</th>
      <th>대구</th>
      <th>광주</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>a</th>
      <td>1.0</td>
      <td>2.0</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>b</th>
      <td>NaN</td>
      <td>NaN</td>
      <td>7.0</td>
      <td>8.0</td>
    </tr>
    <tr>
      <th>c</th>
      <td>3.0</td>
      <td>4.0</td>
      <td>9.0</td>
      <td>10.0</td>
    </tr>
    <tr>
      <th>d</th>
      <td>NaN</td>
      <td>NaN</td>
      <td>11.0</td>
      <td>12.0</td>
    </tr>
    <tr>
      <th>e</th>
      <td>5.0</td>
      <td>6.0</td>
      <td>13.0</td>
      <td>14.0</td>
    </tr>
  </tbody>
</table>
</div>



## join 매서드

`merge` 명령어 대신 `join` 매서드를 사용할 수도 있다.


```python
df1.join(df2, how='outer')
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
      <th>서울</th>
      <th>부산</th>
      <th>대구</th>
      <th>광주</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>a</th>
      <td>1.0</td>
      <td>2.0</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>b</th>
      <td>NaN</td>
      <td>NaN</td>
      <td>7.0</td>
      <td>8.0</td>
    </tr>
    <tr>
      <th>c</th>
      <td>3.0</td>
      <td>4.0</td>
      <td>9.0</td>
      <td>10.0</td>
    </tr>
    <tr>
      <th>d</th>
      <td>NaN</td>
      <td>NaN</td>
      <td>11.0</td>
      <td>12.0</td>
    </tr>
    <tr>
      <th>e</th>
      <td>5.0</td>
      <td>6.0</td>
      <td>13.0</td>
      <td>14.0</td>
    </tr>
  </tbody>
</table>
</div>



## `concat` 함수를 사용한 데이터 연결

`concat` 함수를 사용하면 기준 열(key column)을 사용하지 않고 단순히 데이터를 연결(concatenate)한다.

기본적으로는 위/아래로 데이터 행을 연결한다. 단순히 두 시리즈나 데이터프레임을 연결하기 때문에 인덱스 값이 중복될 수 있다.


```python
s1 = pd.Series([0,1], index=['A','B'])
s2 = pd.Series([2,3,4], index=['A','B','C'])
```


```python
s1
```




    A    0
    B    1
    dtype: int64




```python
s2
```




    A    2
    B    3
    C    4
    dtype: int64




```python
pd.concat([s1, s2])
```




    A    0
    B    1
    A    2
    B    3
    C    4
    dtype: int64



내부적으로 기본값은 `axis=0` 이기 때문에 만약 옆으로 데이터 열을 연결하고 싶으면 `axis=1`로 인수를 설정한다.


```python
df1 = pd.DataFrame(
    np.arange(6).reshape(3, 2),
    index=['a', 'b', 'c'],
    columns=['데이터1', '데이터2'])
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
      <th>데이터1</th>
      <th>데이터2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>a</th>
      <td>0</td>
      <td>1</td>
    </tr>
    <tr>
      <th>b</th>
      <td>2</td>
      <td>3</td>
    </tr>
    <tr>
      <th>c</th>
      <td>4</td>
      <td>5</td>
    </tr>
  </tbody>
</table>
</div>




```python
df2 = pd.DataFrame(
    5 + np.arange(4).reshape(2, 2),
    index=['a', 'c'],
    columns=['데이터3', '데이터4'])
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
      <th>데이터3</th>
      <th>데이터4</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>a</th>
      <td>5</td>
      <td>6</td>
    </tr>
    <tr>
      <th>c</th>
      <td>7</td>
      <td>8</td>
    </tr>
  </tbody>
</table>
</div>




```python
pd.concat([df1, df2], axis=1)
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
      <th>데이터1</th>
      <th>데이터2</th>
      <th>데이터3</th>
      <th>데이터4</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>a</th>
      <td>0</td>
      <td>1</td>
      <td>5.0</td>
      <td>6.0</td>
    </tr>
    <tr>
      <th>b</th>
      <td>2</td>
      <td>3</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>c</th>
      <td>4</td>
      <td>5</td>
      <td>7.0</td>
      <td>8.0</td>
    </tr>
  </tbody>
</table>
</div>

출처 : 데이터사이언스 스쿨(http://datascienceschool.net)
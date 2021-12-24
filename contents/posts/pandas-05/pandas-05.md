---
title: "DataFrame 인덱스 조작"
description:
date: 2020-10-06
update: 2020-10-06
tags:
  - python
  - pandas
series: "python pandas"
---

## DataFrame 인덱스 설정 및 제거

DataFrame에 인덱스로 들어가 있어야 할 데이터가 일반 데이터 열에 들어가 있거나 반대로 일반 데이터 열이어야 할 것이 인덱스로 되어 있을 수 있다. 이 때는 `set_index` 명령이나 `reset_index` 명령으로 인덱스와 일반 데이터 열을 교환할 수 있다.

- set_index : 기존의 행 인덱스를 제거하고 데이터 열 중 하나를 인덱스로 설정
- reset_index : 기존의 행 인덱스를 제거하고 인덱스를 데이터 열로 추가


```python
import numpy as np
np.vstack([list('ABCDE'), np.round(np.random.rand(3,5), 2)])
```




    array([['A', 'B', 'C', 'D', 'E'],
           ['0.67', '0.21', '0.13', '0.32', '0.36'],
           ['0.57', '0.44', '0.99', '0.1', '0.21'],
           ['0.16', '0.65', '0.25', '0.47', '0.24']], dtype='<U32')




```python
import pandas as pd
np.random.seed(0)
df1 = pd.DataFrame(
    np.vstack([list('ABCDE'), np.round(np.random.rand(3,5), 2)]).T, 
    columns=["C1","C2","C3","C4"])
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
      <th>C1</th>
      <th>C2</th>
      <th>C3</th>
      <th>C4</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>A</td>
      <td>0.55</td>
      <td>0.65</td>
      <td>0.79</td>
    </tr>
    <tr>
      <th>1</th>
      <td>B</td>
      <td>0.72</td>
      <td>0.44</td>
      <td>0.53</td>
    </tr>
    <tr>
      <th>2</th>
      <td>C</td>
      <td>0.6</td>
      <td>0.89</td>
      <td>0.57</td>
    </tr>
    <tr>
      <th>3</th>
      <td>D</td>
      <td>0.54</td>
      <td>0.96</td>
      <td>0.93</td>
    </tr>
    <tr>
      <th>4</th>
      <td>E</td>
      <td>0.42</td>
      <td>0.38</td>
      <td>0.07</td>
    </tr>
  </tbody>
</table>
</div>



`set_index` 명령으로 C1열을 인덱스로 설정할 수 있다. 이때 기존 인덱스는 없어진다.


```python
df2 = df1.set_index("C1")
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
      <th>C2</th>
      <th>C3</th>
      <th>C4</th>
    </tr>
    <tr>
      <th>C1</th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>A</th>
      <td>0.55</td>
      <td>0.65</td>
      <td>0.79</td>
    </tr>
    <tr>
      <th>B</th>
      <td>0.72</td>
      <td>0.44</td>
      <td>0.53</td>
    </tr>
    <tr>
      <th>C</th>
      <td>0.6</td>
      <td>0.89</td>
      <td>0.57</td>
    </tr>
    <tr>
      <th>D</th>
      <td>0.54</td>
      <td>0.96</td>
      <td>0.93</td>
    </tr>
    <tr>
      <th>E</th>
      <td>0.42</td>
      <td>0.38</td>
      <td>0.07</td>
    </tr>
  </tbody>
</table>
</div>



마찬가지로 C2열을 인덱스로 지정하면 기존의 인덱스는 사라진다.


```python
df2.set_index("C2")
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
      <th>C3</th>
      <th>C4</th>
    </tr>
    <tr>
      <th>C2</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0.55</th>
      <td>0.65</td>
      <td>0.79</td>
    </tr>
    <tr>
      <th>0.72</th>
      <td>0.44</td>
      <td>0.53</td>
    </tr>
    <tr>
      <th>0.6</th>
      <td>0.89</td>
      <td>0.57</td>
    </tr>
    <tr>
      <th>0.54</th>
      <td>0.96</td>
      <td>0.93</td>
    </tr>
    <tr>
      <th>0.42</th>
      <td>0.38</td>
      <td>0.07</td>
    </tr>
  </tbody>
</table>
</div>



`reset_index` 명령으로 인덱스를 보통의 자료형으로 바꿀 수도 있다. 이 때 인덱스 열은 자료형의 가장 선두로 삽입된다. DataFrame의 인덱스는 정수로 된 디폴트 인덱스로 바뀌게 된다.


```python
df2.reset_index()
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
      <th>C1</th>
      <th>C2</th>
      <th>C3</th>
      <th>C4</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>A</td>
      <td>0.55</td>
      <td>0.65</td>
      <td>0.79</td>
    </tr>
    <tr>
      <th>1</th>
      <td>B</td>
      <td>0.72</td>
      <td>0.44</td>
      <td>0.53</td>
    </tr>
    <tr>
      <th>2</th>
      <td>C</td>
      <td>0.6</td>
      <td>0.89</td>
      <td>0.57</td>
    </tr>
    <tr>
      <th>3</th>
      <td>D</td>
      <td>0.54</td>
      <td>0.96</td>
      <td>0.93</td>
    </tr>
    <tr>
      <th>4</th>
      <td>E</td>
      <td>0.42</td>
      <td>0.38</td>
      <td>0.07</td>
    </tr>
  </tbody>
</table>
</div>



`reset_index` 명령 사용시에 `drop=True`로 설정하면 인덱스 열을 보통의 자료열로 올리는 것이 아니라 그냥 버리게 된다.


```python
df2.reset_index(drop=True)
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
      <th>C2</th>
      <th>C3</th>
      <th>C4</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0.55</td>
      <td>0.65</td>
      <td>0.79</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0.72</td>
      <td>0.44</td>
      <td>0.53</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0.6</td>
      <td>0.89</td>
      <td>0.57</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0.54</td>
      <td>0.96</td>
      <td>0.93</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0.42</td>
      <td>0.38</td>
      <td>0.07</td>
    </tr>
  </tbody>
</table>
</div>



## 다중 인덱스

행이나 열에 여러 계층을 가지는 인덱스 즉, **다중 인덱스(multi-index)**를 설정할 수도 있다. DataFrame을 생성할 때 `columns`인수에 다음 예제처럼 리스트의 리스트(행렬) 형태로 인덱스를 넣으면 다중 열 인덱스를 가지게 된다.


```python
np.random.seed(0)
df3 = pd.DataFrame(
    np.round(np.random.randn(5,4), 2),
    columns=[["A","A","B","B"],
            ["C1","C2","C1","C2"]]
    )
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

    .dataframe thead tr th {
        text-align: left;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr>
      <th></th>
      <th colspan="2" halign="left">A</th>
      <th colspan="2" halign="left">B</th>
    </tr>
    <tr>
      <th></th>
      <th>C1</th>
      <th>C2</th>
      <th>C1</th>
      <th>C2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1.76</td>
      <td>0.40</td>
      <td>0.98</td>
      <td>2.24</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1.87</td>
      <td>-0.98</td>
      <td>0.95</td>
      <td>-0.15</td>
    </tr>
    <tr>
      <th>2</th>
      <td>-0.10</td>
      <td>0.41</td>
      <td>0.14</td>
      <td>1.45</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0.76</td>
      <td>0.12</td>
      <td>0.44</td>
      <td>0.33</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1.49</td>
      <td>-0.21</td>
      <td>0.31</td>
      <td>-0.85</td>
    </tr>
  </tbody>
</table>
</div>



다중 인덱스는 이름을 지정하면 더 편리하게 사용할 수 있다. 열 인덱스들의 이름 지정은 `columns`객체의 `names`속성에 리스트를 넣어서 지정한다.


```python
df3.columns.names = ["Cidx1", "Cidx2"]
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

    .dataframe thead tr th {
        text-align: left;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr>
      <th>Cidx1</th>
      <th colspan="2" halign="left">A</th>
      <th colspan="2" halign="left">B</th>
    </tr>
    <tr>
      <th>Cidx2</th>
      <th>C1</th>
      <th>C2</th>
      <th>C1</th>
      <th>C2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1.76</td>
      <td>0.40</td>
      <td>0.98</td>
      <td>2.24</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1.87</td>
      <td>-0.98</td>
      <td>0.95</td>
      <td>-0.15</td>
    </tr>
    <tr>
      <th>2</th>
      <td>-0.10</td>
      <td>0.41</td>
      <td>0.14</td>
      <td>1.45</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0.76</td>
      <td>0.12</td>
      <td>0.44</td>
      <td>0.33</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1.49</td>
      <td>-0.21</td>
      <td>0.31</td>
      <td>-0.85</td>
    </tr>
  </tbody>
</table>
</div>



마찬가지로 DataFrame을 생성할 때 `index` 인수에 리스트의 리스트(행렬) 형태로 인덱스를 넣으면 다중 (행) 인덱스를 가진다. 행 인덱스들의 이름 지정은 `index` 객체의 `names` 속성에 리스트를 넣어서 지정한다.


```python
np.random.seed(0)
df4 = pd.DataFrame(np.round(np.random.randn(6, 4), 2),
                   columns=[["A", "A", "B", "B"],
                            ["C", "D", "C", "D"]],
                   index=[["M", "M", "M", "F", "F", "F"],
                          ["id_" + str(i + 1) for i in range(3)] * 2])
df4.columns.names = ["Cidx1", "Cidx2"]
df4.index.names = ["Ridx1", "Ridx2"]
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
      <th>Cidx1</th>
      <th colspan="2" halign="left">A</th>
      <th colspan="2" halign="left">B</th>
    </tr>
    <tr>
      <th></th>
      <th>Cidx2</th>
      <th>C</th>
      <th>D</th>
      <th>C</th>
      <th>D</th>
    </tr>
    <tr>
      <th>Ridx1</th>
      <th>Ridx2</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="3" valign="top">M</th>
      <th>id_1</th>
      <td>1.76</td>
      <td>0.40</td>
      <td>0.98</td>
      <td>2.24</td>
    </tr>
    <tr>
      <th>id_2</th>
      <td>1.87</td>
      <td>-0.98</td>
      <td>0.95</td>
      <td>-0.15</td>
    </tr>
    <tr>
      <th>id_3</th>
      <td>-0.10</td>
      <td>0.41</td>
      <td>0.14</td>
      <td>1.45</td>
    </tr>
    <tr>
      <th rowspan="3" valign="top">F</th>
      <th>id_1</th>
      <td>0.76</td>
      <td>0.12</td>
      <td>0.44</td>
      <td>0.33</td>
    </tr>
    <tr>
      <th>id_2</th>
      <td>1.49</td>
      <td>-0.21</td>
      <td>0.31</td>
      <td>-0.85</td>
    </tr>
    <tr>
      <th>id_3</th>
      <td>-2.55</td>
      <td>0.65</td>
      <td>0.86</td>
      <td>-0.74</td>
    </tr>
  </tbody>
</table>
</div>



## 행 인덱스와 열 인덱스 교환

`stack` 명령이나 `unstack` 명령을 쓰면 열 인덱스를 행 인덱스로 바꾸거나 반대로 행 인덱스를 열 인덱스로 바꿀 수 있다.

- `stack()` : 열 인덱스 -> 행 인덱스로 변환
- `unstack()` : 행 인덱스 -> 열 인덱스로 변환

`stack` 명령을 실행하면 열 인덱스가 반시계 방향으로 90도 회전한 것과 비슷한 모양이 된다. 마찬가지로 unstack 명령을 실행하면 행 인덱스가 시계 방향으로 90도 회전한 것과 비슷하다. 인덱스를 지정할 때는 문자열 이름과 순서를 표시하는 숫자 인덱스를 모두 사용할 수 있다.


```python
df4.stack("Cidx1")
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
      <th>Cidx2</th>
      <th>C</th>
      <th>D</th>
    </tr>
    <tr>
      <th>Ridx1</th>
      <th>Ridx2</th>
      <th>Cidx1</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="6" valign="top">M</th>
      <th rowspan="2" valign="top">id_1</th>
      <th>A</th>
      <td>1.76</td>
      <td>0.40</td>
    </tr>
    <tr>
      <th>B</th>
      <td>0.98</td>
      <td>2.24</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">id_2</th>
      <th>A</th>
      <td>1.87</td>
      <td>-0.98</td>
    </tr>
    <tr>
      <th>B</th>
      <td>0.95</td>
      <td>-0.15</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">id_3</th>
      <th>A</th>
      <td>-0.10</td>
      <td>0.41</td>
    </tr>
    <tr>
      <th>B</th>
      <td>0.14</td>
      <td>1.45</td>
    </tr>
    <tr>
      <th rowspan="6" valign="top">F</th>
      <th rowspan="2" valign="top">id_1</th>
      <th>A</th>
      <td>0.76</td>
      <td>0.12</td>
    </tr>
    <tr>
      <th>B</th>
      <td>0.44</td>
      <td>0.33</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">id_2</th>
      <th>A</th>
      <td>1.49</td>
      <td>-0.21</td>
    </tr>
    <tr>
      <th>B</th>
      <td>0.31</td>
      <td>-0.85</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">id_3</th>
      <th>A</th>
      <td>-2.55</td>
      <td>0.65</td>
    </tr>
    <tr>
      <th>B</th>
      <td>0.86</td>
      <td>-0.74</td>
    </tr>
  </tbody>
</table>
</div>




```python
df4.stack(1)
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
      <th>Cidx1</th>
      <th>A</th>
      <th>B</th>
    </tr>
    <tr>
      <th>Ridx1</th>
      <th>Ridx2</th>
      <th>Cidx2</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="6" valign="top">M</th>
      <th rowspan="2" valign="top">id_1</th>
      <th>C</th>
      <td>1.76</td>
      <td>0.98</td>
    </tr>
    <tr>
      <th>D</th>
      <td>0.40</td>
      <td>2.24</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">id_2</th>
      <th>C</th>
      <td>1.87</td>
      <td>0.95</td>
    </tr>
    <tr>
      <th>D</th>
      <td>-0.98</td>
      <td>-0.15</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">id_3</th>
      <th>C</th>
      <td>-0.10</td>
      <td>0.14</td>
    </tr>
    <tr>
      <th>D</th>
      <td>0.41</td>
      <td>1.45</td>
    </tr>
    <tr>
      <th rowspan="6" valign="top">F</th>
      <th rowspan="2" valign="top">id_1</th>
      <th>C</th>
      <td>0.76</td>
      <td>0.44</td>
    </tr>
    <tr>
      <th>D</th>
      <td>0.12</td>
      <td>0.33</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">id_2</th>
      <th>C</th>
      <td>1.49</td>
      <td>0.31</td>
    </tr>
    <tr>
      <th>D</th>
      <td>-0.21</td>
      <td>-0.85</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">id_3</th>
      <th>C</th>
      <td>-2.55</td>
      <td>0.86</td>
    </tr>
    <tr>
      <th>D</th>
      <td>0.65</td>
      <td>-0.74</td>
    </tr>
  </tbody>
</table>
</div>




```python
df4.unstack("Ridx2")
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
      <th>Cidx1</th>
      <th colspan="6" halign="left">A</th>
      <th colspan="6" halign="left">B</th>
    </tr>
    <tr>
      <th>Cidx2</th>
      <th colspan="3" halign="left">C</th>
      <th colspan="3" halign="left">D</th>
      <th colspan="3" halign="left">C</th>
      <th colspan="3" halign="left">D</th>
    </tr>
    <tr>
      <th>Ridx2</th>
      <th>id_1</th>
      <th>id_2</th>
      <th>id_3</th>
      <th>id_1</th>
      <th>id_2</th>
      <th>id_3</th>
      <th>id_1</th>
      <th>id_2</th>
      <th>id_3</th>
      <th>id_1</th>
      <th>id_2</th>
      <th>id_3</th>
    </tr>
    <tr>
      <th>Ridx1</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
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
      <th>F</th>
      <td>0.76</td>
      <td>1.49</td>
      <td>-2.55</td>
      <td>0.12</td>
      <td>-0.21</td>
      <td>0.65</td>
      <td>0.44</td>
      <td>0.31</td>
      <td>0.86</td>
      <td>0.33</td>
      <td>-0.85</td>
      <td>-0.74</td>
    </tr>
    <tr>
      <th>M</th>
      <td>1.76</td>
      <td>1.87</td>
      <td>-0.10</td>
      <td>0.40</td>
      <td>-0.98</td>
      <td>0.41</td>
      <td>0.98</td>
      <td>0.95</td>
      <td>0.14</td>
      <td>2.24</td>
      <td>-0.15</td>
      <td>1.45</td>
    </tr>
  </tbody>
</table>
</div>




```python
df4.unstack(0)
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
      <th>Cidx1</th>
      <th colspan="4" halign="left">A</th>
      <th colspan="4" halign="left">B</th>
    </tr>
    <tr>
      <th>Cidx2</th>
      <th colspan="2" halign="left">C</th>
      <th colspan="2" halign="left">D</th>
      <th colspan="2" halign="left">C</th>
      <th colspan="2" halign="left">D</th>
    </tr>
    <tr>
      <th>Ridx1</th>
      <th>F</th>
      <th>M</th>
      <th>F</th>
      <th>M</th>
      <th>F</th>
      <th>M</th>
      <th>F</th>
      <th>M</th>
    </tr>
    <tr>
      <th>Ridx2</th>
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
      <th>id_1</th>
      <td>0.76</td>
      <td>1.76</td>
      <td>0.12</td>
      <td>0.40</td>
      <td>0.44</td>
      <td>0.98</td>
      <td>0.33</td>
      <td>2.24</td>
    </tr>
    <tr>
      <th>id_2</th>
      <td>1.49</td>
      <td>1.87</td>
      <td>-0.21</td>
      <td>-0.98</td>
      <td>0.31</td>
      <td>0.95</td>
      <td>-0.85</td>
      <td>-0.15</td>
    </tr>
    <tr>
      <th>id_3</th>
      <td>-2.55</td>
      <td>-0.10</td>
      <td>0.65</td>
      <td>0.41</td>
      <td>0.86</td>
      <td>0.14</td>
      <td>-0.74</td>
      <td>1.45</td>
    </tr>
  </tbody>
</table>
</div>



## 다중 인덱스가 있는 경우 인덱싱

DataFrame이 다중 인덱스를 가지는 경우에는 인덱스가 하나의 라벨이나 숫자가 아니라 `()`로 둘러싸인 튜플이 되어야 한다. 예를 들어 앞에서 만든 `df3` DataFrame의 경우 다음과 같이 인덱싱할 수 있다.


```python
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

    .dataframe thead tr th {
        text-align: left;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr>
      <th>Cidx1</th>
      <th colspan="2" halign="left">A</th>
      <th colspan="2" halign="left">B</th>
    </tr>
    <tr>
      <th>Cidx2</th>
      <th>C1</th>
      <th>C2</th>
      <th>C1</th>
      <th>C2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1.76</td>
      <td>0.40</td>
      <td>0.98</td>
      <td>2.24</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1.87</td>
      <td>-0.98</td>
      <td>0.95</td>
      <td>-0.15</td>
    </tr>
    <tr>
      <th>2</th>
      <td>-0.10</td>
      <td>0.41</td>
      <td>0.14</td>
      <td>1.45</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0.76</td>
      <td>0.12</td>
      <td>0.44</td>
      <td>0.33</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1.49</td>
      <td>-0.21</td>
      <td>0.31</td>
      <td>-0.85</td>
    </tr>
  </tbody>
</table>
</div>




```python
df3[("B", "C1")]
```




    0    0.98
    1    0.95
    2    0.14
    3    0.44
    4    0.31
    Name: (B, C1), dtype: float64




```python
df3.loc[0, ("B", "C1")]
```




    0.98




```python
df3.loc[0, ("B", "C1")] = 100
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

    .dataframe thead tr th {
        text-align: left;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr>
      <th>Cidx1</th>
      <th colspan="2" halign="left">A</th>
      <th colspan="2" halign="left">B</th>
    </tr>
    <tr>
      <th>Cidx2</th>
      <th>C1</th>
      <th>C2</th>
      <th>C1</th>
      <th>C2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1.76</td>
      <td>0.40</td>
      <td>100.00</td>
      <td>2.24</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1.87</td>
      <td>-0.98</td>
      <td>0.95</td>
      <td>-0.15</td>
    </tr>
    <tr>
      <th>2</th>
      <td>-0.10</td>
      <td>0.41</td>
      <td>0.14</td>
      <td>1.45</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0.76</td>
      <td>0.12</td>
      <td>0.44</td>
      <td>0.33</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1.49</td>
      <td>-0.21</td>
      <td>0.31</td>
      <td>-0.85</td>
    </tr>
  </tbody>
</table>
</div>



만약 하나의 레벨 값만 넣으면 다중 인덱스 중에서 가장 상위의 값을 지정한 것으로 본다.


```python
df3["A"]
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
      <th>Cidx2</th>
      <th>C1</th>
      <th>C2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1.76</td>
      <td>0.40</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1.87</td>
      <td>-0.98</td>
    </tr>
    <tr>
      <th>2</th>
      <td>-0.10</td>
      <td>0.41</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0.76</td>
      <td>0.12</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1.49</td>
      <td>-0.21</td>
    </tr>
  </tbody>
</table>
</div>



`df4` DataFrame은 다음과 같이 인덱싱할 수 있다.


```python
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
      <th>Cidx1</th>
      <th colspan="2" halign="left">A</th>
      <th colspan="2" halign="left">B</th>
    </tr>
    <tr>
      <th></th>
      <th>Cidx2</th>
      <th>C</th>
      <th>D</th>
      <th>C</th>
      <th>D</th>
    </tr>
    <tr>
      <th>Ridx1</th>
      <th>Ridx2</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="3" valign="top">M</th>
      <th>id_1</th>
      <td>1.76</td>
      <td>0.40</td>
      <td>0.98</td>
      <td>2.24</td>
    </tr>
    <tr>
      <th>id_2</th>
      <td>1.87</td>
      <td>-0.98</td>
      <td>0.95</td>
      <td>-0.15</td>
    </tr>
    <tr>
      <th>id_3</th>
      <td>-0.10</td>
      <td>0.41</td>
      <td>0.14</td>
      <td>1.45</td>
    </tr>
    <tr>
      <th rowspan="3" valign="top">F</th>
      <th>id_1</th>
      <td>0.76</td>
      <td>0.12</td>
      <td>0.44</td>
      <td>0.33</td>
    </tr>
    <tr>
      <th>id_2</th>
      <td>1.49</td>
      <td>-0.21</td>
      <td>0.31</td>
      <td>-0.85</td>
    </tr>
    <tr>
      <th>id_3</th>
      <td>-2.55</td>
      <td>0.65</td>
      <td>0.86</td>
      <td>-0.74</td>
    </tr>
  </tbody>
</table>
</div>




```python
df4.loc[:,("A","C")]
```




    Ridx1  Ridx2
    M      id_1     1.76
           id_2     1.87
           id_3    -0.10
    F      id_1     0.76
           id_2     1.49
           id_3    -2.55
    Name: (A, C), dtype: float64




```python
df4.loc[("M", "id_1"), :]
```




    Cidx1  Cidx2
    A      C        1.76
           D        0.40
    B      C        0.98
           D        2.24
    Name: (M, id_1), dtype: float64




```python
df4.loc[("All", "All"), :] = df4.sum()
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
      <th>Cidx1</th>
      <th colspan="2" halign="left">A</th>
      <th colspan="2" halign="left">B</th>
    </tr>
    <tr>
      <th></th>
      <th>Cidx2</th>
      <th>C</th>
      <th>D</th>
      <th>C</th>
      <th>D</th>
    </tr>
    <tr>
      <th>Ridx1</th>
      <th>Ridx2</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="3" valign="top">M</th>
      <th>id_1</th>
      <td>1.76</td>
      <td>0.40</td>
      <td>0.98</td>
      <td>2.24</td>
    </tr>
    <tr>
      <th>id_2</th>
      <td>1.87</td>
      <td>-0.98</td>
      <td>0.95</td>
      <td>-0.15</td>
    </tr>
    <tr>
      <th>id_3</th>
      <td>-0.10</td>
      <td>0.41</td>
      <td>0.14</td>
      <td>1.45</td>
    </tr>
    <tr>
      <th rowspan="3" valign="top">F</th>
      <th>id_1</th>
      <td>0.76</td>
      <td>0.12</td>
      <td>0.44</td>
      <td>0.33</td>
    </tr>
    <tr>
      <th>id_2</th>
      <td>1.49</td>
      <td>-0.21</td>
      <td>0.31</td>
      <td>-0.85</td>
    </tr>
    <tr>
      <th>id_3</th>
      <td>-2.55</td>
      <td>0.65</td>
      <td>0.86</td>
      <td>-0.74</td>
    </tr>
    <tr>
      <th>All</th>
      <th>All</th>
      <td>6.46</td>
      <td>0.78</td>
      <td>7.36</td>
      <td>4.56</td>
    </tr>
  </tbody>
</table>
</div>



## 다중 인덱스의 인덱스 순서 교환

다중 인덱스의 인덱스 순서를 바꾸고 싶으면 `swaplevel` 명령을 사용한다.

- `swaplevel(i, j, axis)

`i` 와 `j`는 교환하고자 하는 인덱스 라벨(혹은 인덱스 번호)이고 `axis`는 0일 때 행 인덱스, 1일때는 열 인덱스를 뜻한다.(기본값은 0)


```python
df5 = df4.swaplevel("Ridx1", "Ridx2")
df5
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
      <th>Cidx1</th>
      <th colspan="2" halign="left">A</th>
      <th colspan="2" halign="left">B</th>
    </tr>
    <tr>
      <th></th>
      <th>Cidx2</th>
      <th>C</th>
      <th>D</th>
      <th>C</th>
      <th>D</th>
    </tr>
    <tr>
      <th>Ridx2</th>
      <th>Ridx1</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>id_1</th>
      <th>M</th>
      <td>1.76</td>
      <td>0.40</td>
      <td>0.98</td>
      <td>2.24</td>
    </tr>
    <tr>
      <th>id_2</th>
      <th>M</th>
      <td>1.87</td>
      <td>-0.98</td>
      <td>0.95</td>
      <td>-0.15</td>
    </tr>
    <tr>
      <th>id_3</th>
      <th>M</th>
      <td>-0.10</td>
      <td>0.41</td>
      <td>0.14</td>
      <td>1.45</td>
    </tr>
    <tr>
      <th>id_1</th>
      <th>F</th>
      <td>0.76</td>
      <td>0.12</td>
      <td>0.44</td>
      <td>0.33</td>
    </tr>
    <tr>
      <th>id_2</th>
      <th>F</th>
      <td>1.49</td>
      <td>-0.21</td>
      <td>0.31</td>
      <td>-0.85</td>
    </tr>
    <tr>
      <th>id_3</th>
      <th>F</th>
      <td>-2.55</td>
      <td>0.65</td>
      <td>0.86</td>
      <td>-0.74</td>
    </tr>
    <tr>
      <th>All</th>
      <th>All</th>
      <td>6.46</td>
      <td>0.78</td>
      <td>7.36</td>
      <td>4.56</td>
    </tr>
  </tbody>
</table>
</div>




```python
df6 = df4.swaplevel("Cidx1", "Cidx2", 1)
df6
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
      <th>Cidx2</th>
      <th>C</th>
      <th>D</th>
      <th>C</th>
      <th>D</th>
    </tr>
    <tr>
      <th></th>
      <th>Cidx1</th>
      <th>A</th>
      <th>A</th>
      <th>B</th>
      <th>B</th>
    </tr>
    <tr>
      <th>Ridx1</th>
      <th>Ridx2</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="3" valign="top">M</th>
      <th>id_1</th>
      <td>1.76</td>
      <td>0.40</td>
      <td>0.98</td>
      <td>2.24</td>
    </tr>
    <tr>
      <th>id_2</th>
      <td>1.87</td>
      <td>-0.98</td>
      <td>0.95</td>
      <td>-0.15</td>
    </tr>
    <tr>
      <th>id_3</th>
      <td>-0.10</td>
      <td>0.41</td>
      <td>0.14</td>
      <td>1.45</td>
    </tr>
    <tr>
      <th rowspan="3" valign="top">F</th>
      <th>id_1</th>
      <td>0.76</td>
      <td>0.12</td>
      <td>0.44</td>
      <td>0.33</td>
    </tr>
    <tr>
      <th>id_2</th>
      <td>1.49</td>
      <td>-0.21</td>
      <td>0.31</td>
      <td>-0.85</td>
    </tr>
    <tr>
      <th>id_3</th>
      <td>-2.55</td>
      <td>0.65</td>
      <td>0.86</td>
      <td>-0.74</td>
    </tr>
    <tr>
      <th>All</th>
      <th>All</th>
      <td>6.46</td>
      <td>0.78</td>
      <td>7.36</td>
      <td>4.56</td>
    </tr>
  </tbody>
</table>
</div>



## 다중 인덱스가 있는 경우의 정렬

다중 인덱스가 있는 데이터프레임을 `sort_index`로 정렬할 때는 `level` 인수를 사용하여 어떤 인덱스를 기준으로 정렬하는지 알려주어야 한다.


```python
df5.sort_index(level=0)
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
      <th>Cidx1</th>
      <th colspan="2" halign="left">A</th>
      <th colspan="2" halign="left">B</th>
    </tr>
    <tr>
      <th></th>
      <th>Cidx2</th>
      <th>C</th>
      <th>D</th>
      <th>C</th>
      <th>D</th>
    </tr>
    <tr>
      <th>Ridx2</th>
      <th>Ridx1</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>All</th>
      <th>All</th>
      <td>6.46</td>
      <td>0.78</td>
      <td>7.36</td>
      <td>4.56</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">id_1</th>
      <th>F</th>
      <td>0.76</td>
      <td>0.12</td>
      <td>0.44</td>
      <td>0.33</td>
    </tr>
    <tr>
      <th>M</th>
      <td>1.76</td>
      <td>0.40</td>
      <td>0.98</td>
      <td>2.24</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">id_2</th>
      <th>F</th>
      <td>1.49</td>
      <td>-0.21</td>
      <td>0.31</td>
      <td>-0.85</td>
    </tr>
    <tr>
      <th>M</th>
      <td>1.87</td>
      <td>-0.98</td>
      <td>0.95</td>
      <td>-0.15</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">id_3</th>
      <th>F</th>
      <td>-2.55</td>
      <td>0.65</td>
      <td>0.86</td>
      <td>-0.74</td>
    </tr>
    <tr>
      <th>M</th>
      <td>-0.10</td>
      <td>0.41</td>
      <td>0.14</td>
      <td>1.45</td>
    </tr>
  </tbody>
</table>
</div>




```python
df6.sort_index(axis=1, level=0)
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
      <th>Cidx2</th>
      <th colspan="2" halign="left">C</th>
      <th colspan="2" halign="left">D</th>
    </tr>
    <tr>
      <th></th>
      <th>Cidx1</th>
      <th>A</th>
      <th>B</th>
      <th>A</th>
      <th>B</th>
    </tr>
    <tr>
      <th>Ridx1</th>
      <th>Ridx2</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="3" valign="top">M</th>
      <th>id_1</th>
      <td>1.76</td>
      <td>0.98</td>
      <td>0.40</td>
      <td>2.24</td>
    </tr>
    <tr>
      <th>id_2</th>
      <td>1.87</td>
      <td>0.95</td>
      <td>-0.98</td>
      <td>-0.15</td>
    </tr>
    <tr>
      <th>id_3</th>
      <td>-0.10</td>
      <td>0.14</td>
      <td>0.41</td>
      <td>1.45</td>
    </tr>
    <tr>
      <th rowspan="3" valign="top">F</th>
      <th>id_1</th>
      <td>0.76</td>
      <td>0.44</td>
      <td>0.12</td>
      <td>0.33</td>
    </tr>
    <tr>
      <th>id_2</th>
      <td>1.49</td>
      <td>0.31</td>
      <td>-0.21</td>
      <td>-0.85</td>
    </tr>
    <tr>
      <th>id_3</th>
      <td>-2.55</td>
      <td>0.86</td>
      <td>0.65</td>
      <td>-0.74</td>
    </tr>
    <tr>
      <th>All</th>
      <th>All</th>
      <td>6.46</td>
      <td>7.36</td>
      <td>0.78</td>
      <td>4.56</td>
    </tr>
  </tbody>
</table>
</div>


출처 : 데이터사이언스 스쿨(datascienceschool.net)
---
title: "🤜 Next.js 14 Conf"
description:
date: 2022-11-24
update: 2022-11-24
tags:
  - web
  - react
  - next.js
---

Nextjs는 빠르고 반응성이 뛰어나며 SEO 친화적인 웹 앱을 구축하는 데 사용되는 프런트 엔드 프레임워크입니다. 개발자 친화적으로 만들기 위해 2019년부터 다양한 버전의 Nextjs가 시장에 출시되었고 최근 2023년 10월 26일에 Nextjs 14가 출시되었습니다.

## Next.js 14

- Turbopack
  - 53% 더 빠른 로컬 서버 시작
  - 빠른 새로 고침으로 94% 더 빠른 코드 업데이트
- Server Actions
  - 통합된 캐싱 및 재검증
  - 간단한 함수 호출 또는 기본적으로 form에서 작동
- 부분 pre-rendering: 빠른 초기 정적 응답 + 스트리밍 동적 콘텐츠

```
npx create-next-app@latest
```

## Next.js Compiler: Turbocharged

Next.js 13부터 페이지와 앱 라우터 모두에서 Next.js의 로컬 개발 성능을 개선하기 위해 노력해 왔습니다.

이전에는 이러한 노력을 지원하기 위해 next dev 및 Next.js의 다른 부분을 다시 작성(rewriting)했습니다. 이후 우리는 접근 방식을 좀 더 점진적으로 변경했습니다. 이는 우리가 먼저 모든 Next.js 기능을 지원하는 데 다시 집중했기 때문에 Rust 기반 컴파일러가 곧 안정성에 도달할 것임을 의미합니다.

이제 next dev을 위한 5,000개의 통합 테스트가 기본 Rust 엔진인 Turbopack을 통해 통과되었습니다. 이 테스트에는 7년간의 버그 수정 및 재현이 포함됩니다.

대규모 Next.js 애플리케이션인 vercel.com을 테스트하는 동안 우리는 다음을 확인했습니다:

- 53.3% 더 빠른 로컬 서버 시작
- 빠른 새로 고침으로 94.7% 더 빠른 코드 업데이트

이 벤치마크는 대규모 애플리케이션(및 대규모 모듈 그래프)에서 기대할 수 있는 성능 향상의 실제 결과입니다. 이제 next dev을 위한 테스트의 90%가 통과되었으므로 next dev --turbo를 사용할 때 더 빠르고 안정적인 성능을 지속적으로 확인할 수 있습니다.

테스트를 100% 통과하면 향후 마이너 릴리스에서 Turbopack을 안정 버전으로 이동할 예정입니다. 또한 사용자 정의 구성 및 생태계 플러그인을 위해 webpack 사용을 계속 지원할 예정입니다.

## Forms and Mutations

Next.js 9부터 프런트엔드 코드와 함께 백엔드 엔드포인트를 빠르게 구축하는 방법인 API 경로가 도입되었습니다.

예를 들어 api/ 디렉터리에 새 파일을 생성합니다:

```
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const data = req.body;
  const id = await createItem(data);
  res.status(200).json({ id });
}
```

그런 다음 클라이언트 측에서 React 및 onSubmit과 같은 이벤트 핸들러를 사용하여 API 경로를 fetch할 수 있습니다.

```
import { FormEvent } from 'react';

export default function Page() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const response = await fetch('/api/submit', {
      method: 'POST',
      body: formData,
    });

    // Handle response if necessary
    const data = await response.json();
    // ...
  }

  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="name" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

Next.js 14를 통해 데이터 mutation에 대한 개발자 경험을 단순화 하고 사용자가 네트워크 연결이 느리거나 저전력 장치(lower-powered device)에서 form을 제출할 때 사용자 경험을 개선하려고 합니다.

## Server Action

API 경로를 수동으로 생성할 필요가 없다면 어떻게 될까요? 대신 React 컴포넌트에서 직접 호출하여 서버에서 안전하게 실행되는 함수를 정의할 수 있습니다.

앱 라우터는 프레임워크가 새로운 기능을 채택할 때 안정적인 React Canary 채널을 기반으로 구축되었습니다. v14부터 Next.js는 안정적인 서버 작업을 포함하는 최신 React Canary로 업그레이드 되었습니다.

Pages Router의 이전 예는 하나의 파일로 단순화될 수 있습니다:

```
export default function Page() {
  async function create(formData: FormData) {
    'use server';
    const id = await createItem(formData);
  }

  return (
    <form action={create}>
      <input type="text" name="name" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

서버 작업은 이전에 서버 중심 프레임워크를 사용해 본 적이 있는 모든 개발자에게 친숙하게 느껴질 것입니다. 이는 form 및 FormData Web API와 같은 웹 기본 사항을 기반으로 구축되었습니다. form을 통해 서버 작업을 사용하는 것은 점진적인 향상에 도움이 되지만 필수 사항은 아닙니다. form 없이 함수로 직접 호출할 수도 있습니다. TypeScript를 사용하면 클라이언트와 서버 간에 완전한 end-to-end 타입 안전성이 제공됩니다.

데이터 변경, 페이지 리 렌더링 또는 리다이렉션이 한 번의 네트워크 왕복(one network roundtrip),으로 발생할 수 있으므로 업스트림 공급자가 느린 경우에도 올바른 데이터가 클라이언트에 표시됩니다. 또한 동일한 경로의 다양한 작업을 포함하여 다양한 작업을 구성하고 재사용할 수 있습니다.

## Caching, Revalidating, Redirecting, and more

Server Actions은 전체 앱 라우터 모델에 깊이 통합되어 있습니다.

- revalidatePath() 또는 revalidateTag()를 사용하여 캐시된 데이터의 유효성을 다시 검사
- redirect()를 통해 다른 경로로 리다이렉션
- cookie()를 통해 쿠키 설정 및 읽기
- useOptimistic()을 사용하여 낙관적 UI 업데이트 처리
- useFormState()를 사용하여 서버에서 오류를 포착하고 표시
- useFormStatus()를 사용하여 클라이언트에 로딩 상태 표시

- Server Actions form 및 mutation
  - https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
- 서버 컴포넌트 및 서버 작업에 대한 보안 모델
  - https://nextjs.org/blog/security-nextjs-server-components-actions

## 부분적 Pre-rendering

Next.js를 위해 작업 중인 부분 pre-rendering(빠른 초기 정적 응답을 갖춘 동적 콘텐츠에 대한 컴파일러 최적화)의 미리 보기를 공유하고 싶습니다.

pre-rendering은 서버측 렌더링(SSR), 정적 사이트 생성(SSG) 및 증분적 정적 재검증(ISR)에 대한 10년 간의 연구 개발을 기반으로 구축되었습니다.

## React Suspense를 기반으로 구축

부분 사전 렌더링은 Suspense 경계에 따라 정의됩니다.

```
export default function Page() {
  return (
    <main>
      <header>
        <h1>My Store</h1>
        <Suspense fallback={<CartSkeleton />}>
          <ShoppingCart />
        </Suspense>
      </header>
      <Banner />
      <Suspense fallback={<ProductListSkeleton />}>
        <Recommendations />
      </Suspense>
      <NewProducts />
    </main>
  );
}
```

pre-rendering이 활성화되면 이 페이지는 `<Suspense />` boundary를 기반으로 정적 셸을 생성합니다. React Suspense의 `fallback`은 사전 렌더링됩니다.

그런 다음 셸의 Suspense fallback은 cookie를 읽어 카트를 결정하거나 사용자를 기반으로 배너를 표시하는 등의 동적 컴포넌트로 대체됩니다.

요청이 이루어지면 정적 HTML 셸이 즉시 제공됩니다.

```
<main>
  <header>
    <h1>My Store</h1>
    <div class="cart-skeleton">
      <!-- Hole -->
    </div>
  </header>
  <div class="banner" />
  <div class="product-list-skeleton">
    <!-- Hole -->
  </div>
  <section class="new-products" />
</main>
```

`<ShoppingCart />`는 쿠키에서 읽어 사용자 session을 확인하므로 이 컴포넌트는 정적 셸과 동일한 HTTP 요청의 일부로 스트리밍됩니다. 추가 네트워크 왕복이 필요하지 않습니다.

```
import { cookies } from 'next/headers'

export default function ShoppingCart() {
  const cookieStore = cookies()
  const session = cookieStore.get('session')
  return ...
}
```

가장 세부적인 정적 셸을 가지려면 Suspense boundary를 추가해야 할 수도 있습니다. 그러나 현재 loading.js를 이미 사용하고 있다면 이는 암시적인 Suspense boundray이므로 정적 셸을 생성하는 데 변경이 필요하지 않습니다.

## 메타데이터 개선

뷰포트, 색 구성표 및 테마에 대한 중요한 페이지 콘텐츠를 서버에서 스트리밍하기 전에 먼저 브라우저에 전송해야 하는 메타데이터가 있습니다.

이러한 `meta` 태그가 초기 페이지 콘텐츠와 함께 전송되도록 하면 원활한 사용자 경험에 도움이 되며, 테마 색상을 변경하거나 뷰포트 변경으로 인해 레이아웃이 이동하여 페이지가 깜박이는 것을 방지할 수 있습니다.

Next.js 14에서는 blocking 및 non-blocking 메타데이터를 분리했습니다. 메타데이터 옵션의 작은 하위 집합(small subset)만 차단되며, 우리는 non-blocking 메타데이터가 부분적으로 pre-rendering된 페이지가 정적 셸을 제공하는 것을 방해하지 않도록 하고 싶습니다.

다음 메타데이터 옵션은 이제 더 이상 사용되지 않으며 향후 주요 버전의 메타데이터에서 제거(deprecated)될 예정입니다:

- `viewport`: 뷰포트의 초기 확대/축소 및 기타 속성을 설정합니다.
- `colorScheme`: 뷰포트의 지원 모드(밝음/어두움)를 설정합니다.
- `themeColor`: 뷰포트 주변의 크롬이 렌더링해야 하는 색상을 설정합니다.
  Next.js 14부터 이러한 옵션을 대체하는 새로운 옵션 [`viewport` 및 `generateViewport`](https://nextjs.org/docs/app/api-reference/functions/generate-viewport)가 있습니다. 다른 모든 `메타데이터` 옵션은 동일하게 유지됩니다.

## 마치며

turobopack과 pre-rendering 은 기대가 되는 부분이긴 하지만, ServerActions은 심플해 보이긴 하지만 구조적이러 이렇게 쓰는게 맞나 싶은 느낌이 들기도 하네요. 아무튼 프론트엔드의 변화 속도는 정말 빠른것 같다는 생각입니다.

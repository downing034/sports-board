import configureStore from 'redux-mock-store';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import {
  render,
  fireEvent,
  RenderOptions,
  RenderResult,
} from '@testing-library/react';
// import { ThemeProvider } from '@material-ui/core/styles';

// import to use as a typecheck against real store
import rootStore, { makeStore, RootState } from './store';
// import to wrap components in application theme during tests
// import theme from './theme';

// if store is provided wrap with redux provider, else return children unmodified
function wrapStore(
  store: typeof rootStore | undefined,
  children: React.ReactNode
): React.ReactNode {
  if (!store) {
    return children;
  }

  return <Provider store={store}>{children}</Provider>;
}

// returns a wrapper function that optionally adds a redux store provider
// function newWrapper(store: typeof rootStore | undefined): React.ComponentType {
//   return function ({
//     children,
//   }: {
//     children?: React.ReactNode;
//   }): React.ReactElement {
//     return (
//       <ThemeProvider theme={theme}>{wrapStore(store, children)}</ThemeProvider>
//     );
//   };
// }

// renders with the material theme and redux store provider if present
// function customRender(
//   ui: React.ReactElement,
//   { store, ...renderOptions }: RenderOptions & { store?: typeof rootStore } = {}
// ): RenderResult {
//   if (store === undefined) {
//     store = makeMockStore();
//   }

//   return render(ui, { wrapper: newWrapper(store), ...renderOptions });
// }

// export all utils from react testing library to simplify imports
// and allow easy modifications
export * from '@testing-library/react';
// export with same signature has react testing library
// export { customRender as render };
// export store helper
export { makeStore };


type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P];
};

export type TestState = RecursivePartial<RootState>;

export function makeMockStore(preloadedState: TestState = {}) {
  // load state into real store, then use getState() to setup mock store
  const store = makeStore(preloadedState as unknown as RootState);

  return configureStore<
    RootState,
    ThunkDispatch<RootState, void, Action<string>>
  >(getDefaultMiddleware())(store.getState());
}

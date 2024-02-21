import { computed, inject, Signal } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { signalStoreFeature, withComputed } from '@ngrx/signals';

type RouteParamsConfig = Record<string, (param: string | undefined) => unknown>;

type RouteParamsComputed<Config extends RouteParamsConfig> = {
  [Key in keyof Config]: Config[Key] extends infer TransformFn
    ? TransformFn extends (...args: any[]) => any
      ? Signal<ReturnType<TransformFn>>
      : never
    : never;
};

export function withRouteParams<Config extends RouteParamsConfig>(
  config: Config,
) {
  return signalStoreFeature(
    withComputed(() => {
      const routeParams = injectRouteParams();

      return Object.keys(config).reduce(
        (acc, key) => ({
          ...acc,
          [key]: computed(() => {
            const value = routeParams()[key];
            return config[key](value);
          }),
        }),
        {} as RouteParamsComputed<Config>,
      );
    }),
  );
}

function injectRouteParams(): Signal<Params> {
  const params$ = inject(ActivatedRoute).params;

  return toSignal(params$, {
    initialValue: {} as Record<string, string | undefined>,
  });
}

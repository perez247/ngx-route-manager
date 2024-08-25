
// type ExtractParams<T extends string> =
//     T extends `${infer _Start}:${infer Param}/${infer Rest}` ?
//         Param | ExtractParams<Rest> :
//     T extends `${infer _Start}:${infer Param}` ?
//         Param :
//     string;

// // export type ParamsToFunction<T extends string> =
// //     ExtractParams<T> extends infer U extends string ?
// //         U extends string ?
// //             (args: Record<U, string>) => string :
// //         string :
// //     string;

// export type ParamsToFunction<T extends string> =
//     ExtractParams<T> extends never ? // No parameters detected
//         () => string :
//     ExtractParams<T> extends infer U extends string ? // Parameters detected
//         (args: Record<U, string>) => string :
//     never;

// export function createUrlFunction<T extends string>(template: T): ParamsToFunction<T> {
//     return ((args: Record<string, string>) => {
//         return template.replace(/:([a-zA-Z]+)/g, (_, key) => {
//           if (!args) throw new Error("No arguments provided");
//           return args[key];
//         });
//     }) as ParamsToFunction<T>;
// }

type ExtractParams<T extends string> = T extends `${infer _Start}:${infer Param}/${infer Rest}`
  ? Param | ExtractParams<Rest>
  : T extends `${infer _Start}:${infer Param}`
  ? Param
  : never;

type HasParams<T extends string> = ExtractParams<T> extends never ? false : true;

export type ParamsToFunction<T extends string> = HasParams<T> extends true
  ? (args: Record<ExtractParams<T>, string>) => string
  : () => string;

export function createUrlFunction<T extends string>(template: T): ParamsToFunction<T> {
  return ((args?: Record<string, string>) => {
    if (args === undefined && template.includes(':')) {
      throw new Error('Arguments are required for this template');
    }
    if (args !== undefined && !template.includes(':')) {
      throw new Error('This template does not accept any arguments');
    }
    return template.replace(/:([a-zA-Z]+)/g, (_, key) => {
      return args?.[key] ?? '';
    });
  }) as ParamsToFunction<T>;
}

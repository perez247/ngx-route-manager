import { generateNgxRoute } from 'ngx-route-manager';

export const ngxRoutes = {
  first: generateNgxRoute(),
  second: generateNgxRoute('second'),
  third: generateNgxRoute(':id/:type', ['state', 'q']),
  fourth: generateNgxRoute('admin/users/:id'),
  fifth: generateNgxRoute(':userRole/users/:state'),
  sixth: generateNgxRoute(':date/a/users-08/:options'),
};

// Type is needed to keep consistency
export type NgxRouteType = typeof ngxRoutes;

console.log(ngxRoutes.third.params.id);
console.log(
  ngxRoutes.third.fn(
    { id: ' jkn', type: ' jdk::' },
    { state: '   Adogo_wam __' }
  )
);

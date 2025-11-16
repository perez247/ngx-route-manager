import { generateNgxRoute } from "../lib/functions/generate-ngx-route";

describe('NgxRoute', () => {
  it('should have the correct path', () => {
    const route = generateNgxRoute('home');
    expect(route.path).toBe('home');
  });

  it('should generate the correct url', () => {
    const route = generateNgxRoute('user/:id');
    expect(route.fn({ id: '123' })).toBe('user/123');
  });

  it('should have the correct params', () => {
    const route = generateNgxRoute('user/:id');
    expect(route.params.id.name).toBe('id');
  });

  it('should have the correct segments', () => {
    const route = generateNgxRoute('user/settings');
    expect(route.segments.user).toBe('user');
    expect(route.segments.settings).toBe('settings');
  });

  it('should have the correct query params', () => {
    const route = generateNgxRoute('search', ['q']);
    expect(route.queryParams.q.name).toBe('q');
  });

  it('should return the correct parsed url', () => {
    const route = generateNgxRoute('user/:id', ['debug']);
    const result = route.url({ id: '123' }, { debug: 'true' });
    expect(result).toEqual({
      route: ['user/123'],
      extras: { queryParams: { debug: 'true' } }
    });
  });
});

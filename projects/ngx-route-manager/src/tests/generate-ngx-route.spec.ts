import { generateNgxRoute } from '../lib/functions/generate-ngx-route';

describe('generateNgxRoute', () => {
  it('should create a route with a path', () => {
    const route = generateNgxRoute('/home');
    expect(route.path).toBe('/home');
  });

  it('should create a route with a function', () => {
    const route = generateNgxRoute('/user/:id');
    expect(route.fn({ id: '123' })).toBe('/user/123');
  });

  it('should create a route with params', () => {
    const route = generateNgxRoute('/user/:id');
    expect(route.params.id.name).toBe('id');
  });

  it('should create a route with segments', () => {
    const route = generateNgxRoute('/user/settings');
    expect(route.segments.user).toBe('user');
    expect(route.segments.settings).toBe('settings');
  });

  it('should create a route with query params', () => {
    const route = generateNgxRoute('/search', ['q']);
    expect(route.queryParams.q.name).toBe('q');
  });
});

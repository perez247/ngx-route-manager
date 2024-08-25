import { RouteParams, urlToNgxParam } from "../lib/functions/convertUrlTo";
import { createUrlFunction } from "../lib/functions/createUrlFunction";
import { NgxParam } from "../lib/models/ngx-param";

describe('urlToNgxParam Function', () => {

  it('should create a parameter map for a single parameter route', () => {
    const route = '/user/:id';
    const params = urlToNgxParam(route);
    expect({ id: params.id.name }).toEqual({ id: new NgxParam('id').name });
  });

  it('should create a parameter map for multiple parameters in the route', () => {
      const route = '/user/:id/profile/:profileId';
      const params = urlToNgxParam(route);
      expect({ id: params.id.name, profileId: params.profileId.name }).toEqual({
          id: new NgxParam('id').name,
          profileId: new NgxParam('profileId').name
      });
  });

  it('should return an empty object for routes without parameters', () => {
      const route = '/home';
      const params = urlToNgxParam(route);
      expect(params).toEqual({});
  });

  it('should throw an error for parameter names with special characters', () => {
      const route = '/user/:id123';
      expect(() => urlToNgxParam(route)).toThrowError('id123 must contain only alphabets in /user/:id123');
  });

  it('should throw an error for parameter names containing numbers', () => {
      const route = '/user/:id1';
      expect(() => urlToNgxParam(route)).toThrowError('id1 must contain only alphabets in /user/:id1');
  });

  it('should throw an error for parameter names containing special symbols', () => {
      const route = '/user/:id-name';
      expect(() => urlToNgxParam(route)).toThrowError('id-name must contain only alphabets in /user/:id-name');
  });

  it('should handle routes with multiple occurrences of the same parameter', () => {
      const route = '/:lang/home/:lang';
      const params = urlToNgxParam(route);
      expect({ lang: params.lang.name }).toEqual({
          lang: new NgxParam('lang').name
      });
  });

  it('should handle a route with parameters at different positions', () => {
      const route = '/user/:userId/settings/:settingId';
      const params = urlToNgxParam(route);
      expect({ userId: params.userId.name, settingId: params.settingId.name, }).toEqual({
          userId: new NgxParam('userId').name,
          settingId: new NgxParam('settingId').name
      });
  });

  it('should ignore parameters with valid names but check other parameters', () => {
      const route = '/user/:validParam/:invalidParam1';
      expect(() => urlToNgxParam(route)).toThrowError('invalidParam1 must contain only alphabets in /user/:validParam/:invalidParam1');
  });

});

describe('createUrlFunction', () => {
  it('should replace a single parameter in the template', () => {
      const template = '/user/:id';
      const urlFunction = createUrlFunction(template);
      expect(urlFunction({ id: '123' })).toBe('/user/123');
  });

  it('should replace multiple parameters in the template', () => {
      const template = '/user/:id/profile/:profileId';
      const urlFunction = createUrlFunction(template);
      expect(urlFunction({ id: '123', profileId: '456' })).toBe('/user/123/profile/456');
  });

  it('should handle parameters with special characters', () => {
      const template = '/search/:query';
      const urlFunction = createUrlFunction(template);
      expect(urlFunction({ query: 'a+b=c' })).toBe('/search/a+b=c');
  });

  it('should handle templates without any parameters', () => {
      const template = '/home';
      const urlFunction = createUrlFunction(template);
      expect(urlFunction()).toBe('/home');
  });

  it('should handle multiple occurrences of the same parameter', () => {
      const template = '/:lang/home/:lang';
      const urlFunction = createUrlFunction(template);
      expect(urlFunction({ lang: 'en' })).toBe('/en/home/en');
  });

  it('should handle non-string parameter values gracefully', () => {
      const template = '/user/:id';
      const urlFunction = createUrlFunction(template);
      expect(urlFunction({ id: 123 as any })).toBe('/user/123'); // Assumes non-string values are coerced to strings
  });

  it('should not replace parts of parameter names that are not complete matches', () => {
      const template = '/user/:id/path/:idPath';
      const urlFunction = createUrlFunction(template);
      expect(urlFunction({ id: '123', idPath: '456' })).toBe('/user/123/path/456');
  });

  it('should return a valid URL when no parameters are present in the template', () => {
      const template = '/about';
      const urlFunction = createUrlFunction(template);
      expect(urlFunction()).toBe('/about');
  });
});

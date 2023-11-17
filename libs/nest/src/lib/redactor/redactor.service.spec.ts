import { find, findIndex, get } from 'lodash';
import { v4 } from 'uuid';
import { RedactorService } from './redactor.service';

describe('When calling RedactorService', () => {
  const customProps: Array<{
    prop: string;
    leftPad: number;
    rightPad: number;
  }> = [
    { prop: 'auth0Client', leftPad: 5, rightPad: 5 },
    { prop: 'client_id', leftPad: 5, rightPad: 5 },
    { prop: 'client-id', leftPad: 4, rightPad: 5 },
    { prop: 'clientId', leftPad: 4, rightPad: 5 },
    { prop: 'client_secret', leftPad: 4, rightPad: 5 },
    { prop: 'client-secret', leftPad: 4, rightPad: 5 },
    { prop: 'clientSecret', leftPad: 4, rightPad: 5 },
    { prop: 'client-token', leftPad: 4, rightPad: 5 },
    { prop: 'client_token', leftPad: 4, rightPad: 5 },
    { prop: 'clientToken', leftPad: 4, rightPad: 5 },
    { prop: 'accessToken', leftPad: 4, rightPad: 5 },
    { prop: 'access_token', leftPad: 4, rightPad: 5 },
    { prop: 'access-token', leftPad: 4, rightPad: 5 },
    { prop: 'refresh_token', leftPad: 4, rightPad: 5 },
    { prop: 'refresh-token', leftPad: 4, rightPad: 5 },
    { prop: 'refreshToken', leftPad: 4, rightPad: 5 },
    { prop: 'api_key', leftPad: 0, rightPad: 4 },
    { prop: 'api-key', leftPad: 4, rightPad: 4 },
    { prop: 'apiKey', leftPad: 4, rightPad: 4 },
    { prop: 'api-token', leftPad: 4, rightPad: 4 },
    { prop: 'api_token', leftPad: 4, rightPad: 4 },
    { prop: 'apiToken', leftPad: 4, rightPad: 4 },
    { prop: 'token', leftPad: 4, rightPad: 4 },
    { prop: 'authorization', leftPad: 10, rightPad: 4 },
    { prop: 'secret', leftPad: 0, rightPad: 0 },
    { prop: 'password', leftPad: 0, rightPad: 0 },
    { prop: 'pass', leftPad: 0, rightPad: 0 },
    { prop: 'pwd', leftPad: 0, rightPad: 0 },
    { prop: 'sub', leftPad: 8, rightPad: 4 },
    { prop: 'id', leftPad: 4, rightPad: 4 },
    { prop: 'default_org', leftPad: 7, rightPad: 3 },
    { prop: 'org_id', leftPad: 7, rightPad: 3 },
  ];

  const scrubber = new RedactorService(customProps);

  it('it instantiates correctly', () => {
    expect(scrubber).toBeInstanceOf(RedactorService);
  });
  describe('and has the correct default properties', () => {
    for (const p of customProps) {
      it(`it has ${p.prop}`, () => {
        expect(findIndex(scrubber.defaultPropList, { prop: p.prop })).toBeGreaterThan(-1);
      });
    }
    it(`left is 2`, () => {
      expect(scrubber.left).toEqual(0);
    });
    it(`right is 2`, () => {
      expect(scrubber.right).toEqual(0);
    });
  });
  describe('When calling isString', () => {
    describe('with string', () => {
      it('it returns true', () => {
        expect(scrubber.isString('this is a test')).toEqual(true);
      });
    });
    describe('with object', () => {
      it('it returns false', () => {
        expect(scrubber.isString({ test: 'yes' })).toEqual(false);
      });
    });
    describe('with array', () => {
      it('it returns false', () => {
        expect(scrubber.isString(['test'])).toEqual(false);
      });
    });
    describe('with number', () => {
      it('it returns false', () => {
        expect(scrubber.isString(1)).toEqual(false);
      });
    });
    describe('with function', () => {
      it('it returns false', () => {
        expect(
          scrubber.isString(() => {
            return 'this is a test';
          }),
        ).toEqual(false);
      });
    });
  });
  describe('When calling isObject', () => {
    describe('with string', () => {
      it('it returns false', () => {
        expect(scrubber.isObject('this is a test')).toEqual(false);
      });
    });
    describe('with object', () => {
      it('it returns true', () => {
        expect(scrubber.isObject({ test: 'yes' })).toEqual(true);
      });
    });
    describe('with array', () => {
      it('it returns false', () => {
        expect(scrubber.isObject(['test'])).toEqual(false);
      });
    });
    describe('with number', () => {
      it('it returns false', () => {
        expect(scrubber.isObject(1)).toEqual(false);
      });
    });
    describe('with function', () => {
      it('it returns false', () => {
        expect(
          scrubber.isObject(() => {
            return 'this is a test';
          }),
        ).toEqual(false);
      });
    });
  });
  describe('When calling isArrayOrObject', () => {
    describe('with string', () => {
      it('it returns false', () => {
        expect(scrubber.isArrayOrObject('this is a test')).toEqual(false);
      });
    });
    describe('with object', () => {
      it('it returns true', () => {
        expect(scrubber.isArrayOrObject({ test: 'yes' })).toEqual(true);
      });
    });
    describe('with array', () => {
      it('it returns true', () => {
        expect(scrubber.isArrayOrObject(['test'])).toEqual(true);
      });
    });
    describe('with number', () => {
      it('it returns false', () => {
        expect(scrubber.isArrayOrObject(1)).toEqual(false);
      });
    });
    describe('with function', () => {
      it('it returns false', () => {
        expect(
          scrubber.isArrayOrObject(() => {
            return 'this is a test';
          }),
        ).toEqual(false);
      });
    });
  });
  describe('When calling isArray', () => {
    describe('with string', () => {
      it('it returns false', () => {
        expect(scrubber.isArrayOrObject('this is a test')).toEqual(false);
      });
    });
    describe('with object', () => {
      it('it returns false', () => {
        expect(scrubber.isArrayOrObject({ test: 'yes' })).toEqual(true);
      });
    });
    describe('with array', () => {
      it('it returns true', () => {
        expect(scrubber.isArray(['test'])).toEqual(true);
      });
    });
    describe('with number', () => {
      it('it returns false', () => {
        expect(scrubber.isArrayOrObject(1)).toEqual(false);
      });
    });
    describe('with function', () => {
      it('it returns false', () => {
        expect(
          scrubber.isArrayOrObject(() => {
            return 'this is a test';
          }),
        ).toEqual(false);
      });
    });
  });
  describe('When calling setDefaultPadding', () => {
    describe('with strings', () => {
      it('string is ignored', () => {
        scrubber.setDefaultPadding(parseInt('four'), parseInt('four'));
        expect(scrubber.left).toEqual(0);
        expect(scrubber.right).toEqual(0);
      });
    });
    describe('with positive integers', () => {
      it('set padding works', () => {
        scrubber.setDefaultPadding(4, 4);
        expect(scrubber.left).toEqual(4);
        expect(scrubber.right).toEqual(4);
      });
    });
    describe('with negative integers', () => {
      it('sets padding to zero', () => {
        scrubber.setDefaultPadding(-4, -4);
        expect(scrubber.left).toEqual(0);
        expect(scrubber.right).toEqual(0);
      });
    });
    describe('with floats', () => {
      it('sets padding to rounded int', () => {
        scrubber.setDefaultPadding(1.3, 4.1);
        expect(scrubber.left).toEqual(1);
        expect(scrubber.right).toEqual(4);
      });
    });
  });
  describe('When calling addProperties', () => {
    const scrubber = new RedactorService();
    describe('with valid data', () => {
      it('addProperties works!', () => {
        const properties = [{ prop: 'this_test_key', leftPad: 0, rightPad: 0 }];
        expect(() => scrubber.addProperties(properties)).not.toThrow();
      });
    });
    describe('with strings', () => {
      it('it throws', () => {
        const data = { key: 'this is a test' };
        // @ts-ignore
        expect(() => scrubber.addProperties(get(data, 'key'))).toThrow();
      });
    });
    describe('with objects', () => {
      it('it throws', () => {
        const data = { key: { value: 'this is a test' } };
        // @ts-ignore
        expect(() => scrubber.addProperties(get(data, 'key'))).toThrow();
      });
    });
    describe('with numbers', () => {
      it('it throws', () => {
        const data = { key: 9 };
        // @ts-ignore
        expect(() => scrubber.addProperties(get(data, 'key'))).toThrow();
      });
    });
  });
  describe('When calling addProperty', () => {
    const scrubber = new RedactorService();

    describe('with a string', () => {
      it('addProperty works!', () => {
        const initial = scrubber.defaultPropList.length;
        const prop = 'another_test_key';
        scrubber.addProperty(prop);
        expect(scrubber.defaultPropList).toHaveLength(initial + 1);
      });
    });
    describe('with an existing key', () => {
      it('it is ignored', () => {
        const initial = scrubber.defaultPropList.length;
        const data = { key: 'another_test_key' };
        scrubber.addProperty(get(data, 'key'));
        expect(scrubber.defaultPropList).toHaveLength(initial);
      });
    });
    describe('with an existing object', () => {
      it('is ignored', () => {
        const initial = scrubber.defaultPropList.length;
        const data = { key: { value: 'another_test_key' } };
        expect(scrubber.defaultPropList).toHaveLength(initial);
      });
    });
    describe('with an invalid object', () => {
      it('throws exception', () => {
        const data = { key: { value: 'this is a test' } };
        expect(() => {
          // @ts-ignore
          scrubber.addProperty(get(data, 'key'));
        }).toThrow();
      });
    });
    describe('with an array', () => {
      it('throws exception', () => {
        const data = { key: ['another_test_key'] };
        expect(() => {
          // @ts-ignore
          scrubber.addProperty(get(data, 'key'));
        }).toThrow();
      });
    });
    describe('with a number', () => {
      it('it adds the property', () => {
        const initial = scrubber.defaultPropList.length;
        const data = { key: 9 };
        // @ts-ignore
        scrubber.addProperty(get(data, 'key'));
        expect(scrubber.defaultPropList).toHaveLength(initial + 1);
      });
    });
  });
  describe('When calling redactString', () => {
    const scrubber = new RedactorService(customProps);

    describe('with a string', () => {
      for (const p of customProps) {
        describe(`that contains ${p.prop}`, () => {
          const str = `${p.prop}: ${v4()}`;
          it('it is scrubbed!', () => {
            const scrubbed = scrubber.redactProp(str, p.leftPad, p.rightPad); //cl****17
            const pattern = new RegExp(`(.{${p.leftPad}}#{4}.{${p.rightPad}})`);
            expect(scrubbed).toMatch(pattern);
          });
        });
      }
    });
    describe('with an object', () => {
      it('it is ignored', () => {
        const data = { key: { value: 'this is a test' } };
        // @ts-ignore
        const scrubbed = scrubber.redactProp(get(data, 'key'));
        expect(scrubbed).toEqual(get(data, 'key'));
      });
    });
    describe('with an array', () => {
      it('it is ignored', () => {
        const data = { key: ['this is a test'] };
        // @ts-ignore
        const scrubbed = scrubber.redactProp(get(data, 'key'));
        expect(scrubbed).toEqual(get(data, 'key'));
      });
    });
    describe('with a number', () => {
      it('it is ignored', () => {
        const data = { key: 9 };
        // @ts-ignore
        const scrubbed = scrubber.redactProp(get(data, 'key'));
        expect(scrubbed).toEqual(get(data, 'key'));
      });
    });
  });
  describe('When calling redact', () => {
    describe('with an object', () => {
      const scrubit = {
        auth0Client: v4(),
        client_id: v4(),
        'client-id': v4(),
        clientId: v4(),
        client_secret: v4(),
        'client-secret': v4(),
        clientSecret: v4(),
        client_token: v4(),
        'client-token': v4(),
        clientToken: v4(),
        accessToken: v4(),
        access_token: v4(),
        'access-token': v4(),
        refresh_token: v4(),
        'refresh-token': v4(),
        refreshToken: v4(),
        api_key: v4(),
        'api-key': v4(),
        apiKey: v4(),
        api_token: v4(),
        'api-token': v4(),
        apiToken: v4(),
        token: v4(),
        authorization: v4(),
        secret: v4(),
        password: v4(),
        pass: v4(),
        pwd: v4(),
        sub: v4(),
        id: v4(),
        default_org: v4(),
        org_id: v4(),
        deep: { nested: { id: v4() } },
      };

      describe('using default properties', () => {
        const defaultScrubber = new RedactorService();
        const defaultScrubbed = defaultScrubber.redact(scrubit);

        for (const p of defaultScrubber.defaultPropList) {
          it(`${p.prop} is scrubbed!`, () => {
            const pattern = new RegExp(`.{${p.leftPad}}#{4}.{${p.rightPad}}`);
            const val = get(defaultScrubbed, p.prop);
            expect(val).toMatch(pattern);
          });
        }

        it('deeply nested property is scrubbed', () => {
          const val = get(defaultScrubbed, 'deep.nested.id');
          expect(val).toMatch(/.{2}#{4}[aA-zZ0-9]{2}/);
        });
      });

      describe('using custom properties', () => {
        const scrubber = new RedactorService();

        scrubber.addProperties(customProps);

        const scrubbed = scrubber.redact(scrubit);
        for (const p of customProps) {
          it(`${p.prop} is scrubbed!`, () => {
            const pattern = new RegExp(`.{${p.leftPad}}#{4}.{${p.rightPad}}`);
            const val = get(scrubbed, p.prop);
            expect(val).toMatch(pattern);
          });
        }
      });
    });
    describe('with an aray', () => {
      const scrubit = [
        {
          auth0Client: v4(),
        },
        {
          client_id: v4(),
        },
        {
          'client-id': v4(),
        },
        {
          clientId: v4(),
        },
        {
          client_secret: v4(),
        },
        {
          'client-secret': v4(),
        },
        {
          clientSecret: v4(),
        },
        {
          client_token: v4(),
        },
        {
          'client-token': v4(),
        },
        {
          clientToken: v4(),
        },
        {
          accessToken: v4(),
        },
        {
          access_token: v4(),
        },
        {
          'access-token': v4(),
        },
        {
          refresh_token: v4(),
        },
        {
          'refresh-token': v4(),
        },
        {
          refreshToken: v4(),
        },
        {
          api_key: v4(),
        },
        {
          'api-key': v4(),
        },
        {
          apiKey: v4(),
        },
        {
          api_token: v4(),
        },
        {
          'api-token': v4(),
        },
        {
          apiToken: v4(),
        },
        {
          token: v4(),
        },
        {
          authorization: v4(),
        },
        {
          secret: v4(),
        },
        {
          password: v4(),
        },
        {
          pass: v4(),
        },
        {
          pwd: v4(),
        },
        {
          sub: v4(),
        },
        {
          id: v4(),
        },
        {
          default_org: v4(),
        },
        {
          org_id: v4(),
        },
      ];
      const scrubber = new RedactorService(customProps);
      const scrubbed = scrubber.redact(scrubit);

      for (const p of customProps) {
        it(`${p.prop} is scrubbed!`, () => {
          if (p.prop === 'tazworks_password' || p.prop === 'tazworks_user') {
            const ar = scrubbed['0'].tazWorks;
            const val = find(ar, p.prop);
            const pattern = new RegExp(`.{${p.leftPad}}#{4}.{${p.rightPad}}`);
            expect(val[p.prop]).toMatch(pattern);
          } else {
            const val = find(scrubbed, p.prop);
            const pattern = new RegExp(`.{${p.leftPad}}#{4}.{${p.rightPad}}`);
            expect(val[p.prop]).toMatch(pattern);
          }
        });
      }
      it('deeply nested property is scrubbed', () => {
        const val = find(scrubbed, 'id');
        expect(val['id']).toMatch(/.{0}#{4}.{4}/);
      });
    });
  });
});

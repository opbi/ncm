import { objToDotenv } from '../format';

describe('objToDotenv', () => {
  it('transform json into dotenv style key-value content', () => {
    const obj = {
      id: 1,
      foo: 'bar',
    };
    const result = objToDotenv(obj);
    expect(result).toMatchSnapshot();
  });
});

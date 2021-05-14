import { noop } from './utilities/noop'

it('サンプルテスト', () => {
  noop()
  expect(1).toEqual(1)
})

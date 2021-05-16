import { noop } from './library/noop'

it('サンプルテスト', () => {
  noop()
  expect(1).toEqual(1)
})

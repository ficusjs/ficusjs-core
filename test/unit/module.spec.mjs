import test from 'ava'
import sinon from 'sinon'
import { use } from '../../src/index.mjs'

test('use module', t => {
  const create = sinon.spy()
  const module = {
    create
  }
  const args = { test: 'test' }
  use(module, args)
  t.truthy(create.called)
  t.deepEqual(create.getCall(0).args, [{ ...args, use }])
})

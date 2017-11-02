import { Task } from '.'
import { User } from '../user'

let user, task

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  task = await Task.create({ user, title: 'test', label: 'test', date: 'test', text: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = task.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(task.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.title).toBe(task.title)
    expect(view.label).toBe(task.label)
    expect(view.date).toBe(task.date)
    expect(view.text).toBe(task.text)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = task.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(task.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.title).toBe(task.title)
    expect(view.label).toBe(task.label)
    expect(view.date).toBe(task.date)
    expect(view.text).toBe(task.text)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})

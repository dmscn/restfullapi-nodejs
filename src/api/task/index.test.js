import request from 'supertest-as-promised'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Task } from '.'

const app = () => express(routes)

let userSession, task

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  userSession = signSync(user.id)
  task = await Task.create({})
})

test('POST /tasks 201 (user)', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ access_token: userSession, title: 'test', label: 'test', date: 'test', text: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.title).toEqual('test')
  expect(body.label).toEqual('test')
  expect(body.date).toEqual('test')
  expect(body.text).toEqual('test')
})

test('POST /tasks 401', async () => {
  const { status } = await request(app())
    .post('/')
  expect(status).toBe(401)
})

test('GET /tasks 200 (user)', async () => {
  const { status, body } = await request(app())
    .get('/')
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /tasks 401', async () => {
  const { status } = await request(app())
    .get('/')
  expect(status).toBe(401)
})

test('GET /tasks/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`/${task.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(task.id)
})

test('GET /tasks/:id 401', async () => {
  const { status } = await request(app())
    .get(`/${task.id}`)
  expect(status).toBe(401)
})

test('GET /tasks/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /tasks/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`/${task.id}`)
    .send({ access_token: userSession, title: 'test', label: 'test', date: 'test', text: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(task.id)
  expect(body.title).toEqual('test')
  expect(body.label).toEqual('test')
  expect(body.date).toEqual('test')
  expect(body.text).toEqual('test')
})

test('PUT /tasks/:id 401', async () => {
  const { status } = await request(app())
    .put(`/${task.id}`)
  expect(status).toBe(401)
})

test('PUT /tasks/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ access_token: userSession, title: 'test', label: 'test', date: 'test', text: 'test' })
  expect(status).toBe(404)
})

test('DELETE /tasks/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`/${task.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /tasks/:id 401', async () => {
  const { status } = await request(app())
    .delete(`/${task.id}`)
  expect(status).toBe(401)
})

test('DELETE /tasks/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

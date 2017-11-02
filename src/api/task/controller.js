import _ from 'lodash'
import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Task } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Task.create({ ...body, user })
    .then((task) => task.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor }, user }, res, next) =>
  Task.find({ user: user.id, ...query }, select, cursor)
    .populate('user')
    .then((task) => tasks.map((task) => task.view() : null))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Task.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((task) => task ? task.view())
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Task.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((task) => task ? _.merge(task, body).save() : null)
    .then((task) => task ? task.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Task.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((task) => task ? task.remove() : null)
    .then(success(res, 204))
    .catch(next)

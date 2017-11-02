import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Task, { schema } from './model'

const router = new Router()
const { title, label, date, text } = schema.tree

/**
 * @api {post} /tasks Create task
 * @apiName CreateTask
 * @apiGroup Task
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam title Task's title.
 * @apiParam label Task's label.
 * @apiParam date Task's date.
 * @apiParam text Task's text.
 * @apiSuccess {Object} task Task's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Task not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ title, label, date, text }),
  create)

/**
 * @api {get} /tasks Retrieve tasks
 * @apiName RetrieveTasks
 * @apiGroup Task
 * @apiPermission user
 * @apiParam {String} access_token User access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} tasks List of tasks.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 User access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /tasks/:id Retrieve task
 * @apiName RetrieveTask
 * @apiGroup Task
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} task Task's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Task not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /tasks/:id Update task
 * @apiName UpdateTask
 * @apiGroup Task
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam title Task's title.
 * @apiParam label Task's label.
 * @apiParam date Task's date.
 * @apiParam text Task's text.
 * @apiSuccess {Object} task Task's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Task not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ title, label, date, text }),
  update)

/**
 * @api {delete} /tasks/:id Delete task
 * @apiName DeleteTask
 * @apiGroup Task
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Task not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router

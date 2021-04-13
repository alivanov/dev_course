const Router = require('koa-router');
const Task = require('../api/task');

const router = new Router();

router.post('/tasks', async (ctx) => {
  try {
    const result = await Task.addTask({ ...ctx.request.body });
    console.log(result);
    ctx.body = result;
  } catch (err) {
    console.log('err', err);
    ctx.status = 500;
    ctx.body = 'Internal Error';
  }
});

router.get('/tasks/:id', async (ctx) => {
  try {
    const result = await Task.getTask({ id: ctx.params.id });
    ctx.body = result;
  } catch (err) {
    console.log('err', err);
    ctx.status = 500;
    ctx.body = err.message || 'Internal Error';
  }
});

router.get('/tasks', async (ctx) => {
  try {
    const result = await Task.getTasks();
    ctx.body = result;
  } catch (err) {
    console.log('err', err);
    ctx.status = 500;
    ctx.body = err.message || 'Internal Error';
  }
});

router.patch('/tasks/:id', async (ctx) => {
  try {
    const result = await Task.updateTask({ ...ctx.request.body, id: ctx.params.id });
    ctx.body = result;
  } catch (err) {
    console.log('err', err);
    ctx.status = 500;
    ctx.body = err.message || 'Internal Error';
  }
});

router.get('/', async (ctx) => {
  ctx.body = 'Hello KOA!';
});

module.exports = router;

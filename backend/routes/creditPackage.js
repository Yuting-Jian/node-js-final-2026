const { router } = require('express')
const SkillController = require('../controllers/skill')

router.get('/coaches/skill',SkillController.getSkills)


module.exports = router
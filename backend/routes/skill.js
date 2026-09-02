const { router } = require('express')
const SkillController = require('../controllers/skill')

router.get('/coaches/skill',SkillController.getSkills)

router.post('/coaches/skill',SkillController.postSkills)

router.delete('/coaches/skill/:id',SkillController.deleteSkill)

module.exports = router
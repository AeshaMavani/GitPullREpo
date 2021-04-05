const express=require('express')
const router=express.Router();

const { 
    getServices, 
    newService, 
    getSingleService, 
    updateService, 
    deleteService 
} = require('../controllers/serviceController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.route('/services').get(getServices);
router.route('/service/:id').get(getSingleService);
router.route('/admin/service/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateService)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteService);
router.route('/admin/services/new').post(isAuthenticatedUser, authorizeRoles('admin'), newService);

module.exports=router;
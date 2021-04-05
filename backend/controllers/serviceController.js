const Service = require('../models/service')
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures')


// Create new Service => /api/v1/admin/services/new
exports.newService = catchAsyncErrors(async(req, res, next) =>{

    const service = await Service.create(req.body);

    res.status(201).json({
        success:true,
        service
    })
})


// Get all services => /api/v1/services?keyword=normal
exports.getServices= catchAsyncErrors(async (req,res,next)=>{

    // return next(new ErrorHandler('My Error',400))

    const resPerPage = 3;
    const serviceCount = await Service.countDocuments();

    const apifeatures = new APIFeatures(Service.find(),req.query)
        .search()
        .pagination(resPerPage)
    
    const services = await apifeatures.query;
    res.status(200).json({
        success:true,
        serviceCount,
        services
    })
})

// Get single service details => /api/v1/service/:id
exports.getSingleService = catchAsyncErrors(async (req, res, next) => {
    const service = await Service.findById(req.params.id);

    if(!service){
        return next(new ErrorHandler('Service not found',404))
    }

    res.status(200).json({
        success:true,
        service
    })
})

// Update service details => /api/v1/admin/service/:id
exports.updateService = catchAsyncErrors(async (req, res, next) => {
    let service = await Service.findById(req.params.id);

    if(!service){
        return next(new ErrorHandler('Service not found',404))
    }

    service = await Service.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
        service
    })
})

// Delete service => /api/v1/admin/service/:id
exports.deleteService = catchAsyncErrors(async (req, res, next) => {
    const service = await Service.findById(req.params.id);

    if(!service){
        return next(new ErrorHandler('Service not found',404))
    }

    await service.remove();

    res.status(200).json({
        success:true,
        message:'Service is deleted.'
    })
})
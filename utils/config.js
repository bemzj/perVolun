const config = {
    // route: 'https://api.hengdikeji.com/',
    route: 'https://haotaitai.hengdikeji.com/perfect/public/index.php/',
    imgRout: 'https://haotaitai.hengdikeji.com/perfect/public',
    token: 'safdsf2342%^@#@#@#ss`1`ljkjlkl&&888**',
}
const api = {
    SmallLogin: 'api/Program/index', // 登录
    SmallUserInfo: 'api/Program/getuserinfo', // 昵称头像
    Pic: 'api/Api/pic', // 获取广告图片
    getActionPic: 'api/Api/getActionPic',
    Upload: 'api/Api/upload', // 上传图片
    Idea: 'api/Api/idea', // 建议
    OrderStatus: 'api/Api/orderStatus', // 订单状态
    /**********义工API************/
    Service: 'api/Api/service', // 获取服务预约
    RegisterV: 'api/Api/registerV', // 义工注册
    hasRegister:'api/Api/hasRegister', // 是否已经注册
    GetVolunteer: 'api/Api/getVolunteer', // 义工信息
    /**********用户API************/
    InfoU: 'api/Api/infoU', // 获取用户信息 
    AddOrder: 'api/Api/addOrder', // 生成订单，预约义工
    GetVInfo: 'api/Api/getVInfo', // 获取义工历史服务、我的义工
}
module.exports = {
    api,
    config,
}
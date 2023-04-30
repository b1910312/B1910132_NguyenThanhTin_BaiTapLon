import { createWebHistory, createRouter } from "vue-router";
const routes = [
    {
        path: "/",
        alias: "/homepage",
        name: "HomePage",meta: { title: 'Skills - MyApp' },
        component: () => import("../views/HomePage.vue"),
        
    },
    // Quan ly tai khoan
    {
        path: "/admin",
        name: "DangNhap",
        component: () =>
            import ("../views/QuanLy/QLTaiKhoan/DangNhap.vue"),
    },

  
    // Quan ly san pham
    {
        path: "/admin/SanPham/:id",
        name: "QLsanpham",
        component: () =>
            import ("../views/QuanLy/QLSanPham/QLSanPham.vue"),
    },


    {
        path: "/admin/SanPhamThem/:id",
        name: "QLSanPhamThem",
        component: () =>
            import ("../views/QuanLy/QLSanPham/QLSanPhamThem.vue"),
    },

    {
        path: "/admin/SanPhamSua/:id/:sanpham",
        name: "QLSanPhamSua",
        component: () =>
            import ("../views/QuanLy/QLSanPham/QLSanPhamSua.vue"),
    },


     // Quan ly danh muc
    {
        path: "/admin/DanhMucSanPham/:id",
        name: "QLDanhMucSanPham",
        component: () =>
            import ("../views/QuanLy/QLDanhMuc/QLDanhMucSanPham.vue"),
    },

    {
        path: "/admin/TaoDanhMuc/:id",
        name: "TaoDanhMuc",
        component: () =>
            import ("../views/QuanLy/QLDanhMuc/QLTaoDanhMuc.vue"),
    },

    {
        path: "/admin/SuaDanhMuc/:id/:user",
        name: "SuaDanhMuc",
        component: () =>
            import ("../views/QuanLy/QLDanhMuc/QLDanhMucSua.vue"),
    },


    // Quan ly nhan vien
    {
        path: '/admin/NhanVien/:id',
        name: 'QLNhanVien',        
        component: () =>
            import ("../views/QuanLy/QLNhanVien/QLNhanVien.vue"),
    },   
    {
        path: '/admin/ThemNhanVien/:id',
        name: 'ThemNhanVien',        
        component: () =>
            import ("../views/QuanLy/QLNhanVien/QLThemNhanVien.vue"),
    }, 

    {
        path: '/admin/SuaNhanVien/:id/:user',
        name: 'SuaNhanVien',        
        component: () =>
            import ("../views/QuanLy/QLNhanVien/QLSuaNhanVien.vue"),
    },  

    
//-------------------------------------------------KHACHHANG-----------------------------------
    {
        path: '/DangNhap',
        name: 'KHDangNhap',        
        component: () =>
            import ("../views/KhachHang/QLTaiKhoan/DangNhap.vue"),
    },

    {
        path: '/DangKy',
        name: 'KHDangKy',        
        component: () =>
            import ("../views/KhachHang/QLTaiKhoan/DangKy.vue"),
    },

    
    {
        path: '/GioHang',
        name: 'GioHang',        
        component: () =>
            import ("../views/KhachHang/QLGioHang/GioHang.vue"),
    },

    {
        path: '/DonHang',
        name: 'DonHang',        
        component: () =>
            import ("../views/KhachHang/QLGioHang/DonHang.vue"),
    },

    {
        path: '/CTSP/:id',
        name: 'CTSP',        
        component: () =>
            import ("../views/KhachHang/QLGioHang/ChiTietSanPham.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
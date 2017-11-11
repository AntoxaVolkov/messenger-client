import Vue from 'vue'
import Router from 'vue-router'
import jwtToken from './../helpers/jwt-token';
import Store from './../store/index'

Vue.use(Router)


const router = new Router({
  routes: [
    {
        path: '/',
        component: require('@/components/Pages/Mi'),
        children: [{
            path: '',
            name: 'mi',
            component: require('@/components/Pages/Mi/Home'),
            meta: { requiresAuth: true, verifiedEmail: true } 
        },
        {
            path: '/chat/:id',
            name: 'chat',
            component: require('@/components/Pages/Mi/Chat'),
            meta: { requiresAuth: true, verifiedEmail: true } 
        },
        {
            path: '/profile/:id',
            name: 'profile',
            component: require('@/components/Pages/Mi/Profile'),
            meta: { requiresAuth: true, verifiedEmail: true } 
        },
        {
            path: '/setting',
            name: 'setting',
            component: require('@/components/Pages/Setting'),
            meta: { requiresAuth: true, verifiedEmail: true } 
        }]
    },
    {
        path: '/login',
        name: 'login',
        component: require('@/components/Pages/Login'),
        meta: { requiresGuest: true }
    },
    {
        path: '/reset',
        name: 'reset',
        component: require('@/components/Pages/Reset'),
        meta: { requiresGuest: true }
    },
    {
        path: '/verifycode',
        name: 'verifycode',
        component: require('@/components/Pages/Reset/VerifyCode'),
        meta: { requiresGuest: true } 
    },
    {
        path: '/registration',
        name: 'registration',
        component: require('@/components/Pages/Registration'),
        meta: { requiresGuest: true }
    },
    {
        path: '/verify',
        name: 'verify',
        component: require('@/components/Pages/Registration/VerifyEmail'),
        meta: { requiresAuth: true, verifiedEmail: true } // изменить на авторизованного и добавить условие "не подтверждена почта"
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
    Store.dispatch('hideErrorNotification');
    
    if(to.meta.requiresAuth && to.meta.verifiedEmail) {
        if(Store.state.authUser.authenticated || jwtToken.getToken()){
            if(!Store.state.authUser.authenticated){
                Store.dispatch('startSocketConnection');
                Store.dispatch('startLoading')
                Store.dispatch('checkVerified')
                .then((verified) => {
                    Store.dispatch('finishedLoading')
                    if(verified)
                        return next();
                    else
                        return next({name:'verify'})
                });
            }else{
                if(Store.state.authUser.everified)
                    return next();
                else
                    return next({name:'verify'})
            }

            return next();
        }else{
            return next({name: 'login'});
        }

            
    }
    if(to.meta.requiresAuth) {
        if(Store.state.authUser.authenticated || jwtToken.getToken()){
            if(!Store.state.authUser.authenticated){
                Store.dispatch('startSocketConnection');
            }
            return next();
        }else{
            return next({name: 'login'});
        }      
    }
    if(to.meta.requiresGuest) {
        if(Store.state.authUser.authenticated || jwtToken.getToken())
            return next({name: 'mi'});
        else
            return next();
    }
    next();
});

export default router;
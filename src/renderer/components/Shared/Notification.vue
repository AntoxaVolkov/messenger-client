<template>
    <div class="notification">
        <transition name="notification" mode="out-in" appear>
            <div class="notification-item" v-if="success || error || info || warning" :class="{success, warning, error, info}" @click="hideAllNotifications">
                <strong>{{ $t(msg) }}</strong>
            </div>
        </transition>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex';

    export default {
        name: 'notification',
        computed: {
            ...mapState({
                success: state => state.notification.success,
                warning: state => state.notification.warning,
                error: state => state.notification.error,
                info: state => state.notification.info,
                msg: state => state.notification.msg
            })
        },
        methods: {
            ...mapActions([
                'hideSuccessNotification',
                'hideErrorNotification',
                'hideInfoNotification',
                'hideAllNotifications'
            ])
        }
    }
</script>

<style lang="scss">
    .notification-enter-active, .notification-leave-active {
        transition: margin-top .5s
    }
    .notification-enter, .notification-leave-to /* .fade-leave-active до версии 2.1.8 */ {
        margin-top: -100px;
    }
    .notification{
        position: fixed;
        top: 30px;
        width: 100%;

        .notification-item{
            border-bottom-width: 2px;
            border-bottom-style: solid;
            text-align: center;
            padding: 10px;
        }
        .success{
            background-color: rgba(208,233,198,0.7);
            color: rgb(60,118,61);
            border-color: rgb(60,118,61);
        }

        .warning{
            background-color: rgba(250,242,204, 0.7);
            color: rgb(166,109,69);
            border-color: rgb(166,109,69);
        }

        .error{
            background-color: rgba(235,204,204, 0.7);
            color: rgb(169,68,66);
            border-color: rgb(169,68,66);
        }

        .info{
            background-color: rgba(188,223,241, 0.7);
            color: rgb(49,112,143);
            border-color: rgb(49,112,143);
        }

    }
</style>

<template>
<transition name="modal">
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">

                <div class="modal-header">
                    <slot name="header">
                        default header
                        <button type="button" class="btn-close" @click="close">
                                x
                            </button>
                    </slot>
                </div>

                <div class="modal-body">
                    <slot name="body">
                        default body
                    </slot>
                </div>

                <div class="modal-footer">
                    <slot name="footer">
                        <!-- <a class="modal-default-button btn btn-red" href="/login" @click="close">
                                <slot name="close">
                                    OK
                                </slot>    
                            </a> -->
                        <a class="modal-default-button btn btn-red" @click="close">
                            <slot name="close">
                                OK
                            </slot>
                        </a>
                        <a v-if="actionurl" class="modal-default-button btn btn-cta btn-blue" style="width: max-content;" @click="submit">
                            <slot name="action">
                                Submit
                            </slot>
                        </a>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</transition>
</template>

<script>
import axios from 'axios';
export default {
    name: 'v-modal',
    props: {
        actionurl: {
            type: String,
        },
    },
    methods: {
        close: function () {
            this.$emit('close');
        },
        submit: function () {
            this.$emit('submit');
        },
    }
}
</script>

<style lang="scss" scoped>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    width: 600px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
    font-size: 30px !important;
}

.modal-body {
    margin: 20px 0;
    font-size: 1.4em;
}

.modal-default-button {
    margin: auto
}

.modal-enter {
    opacity: 0;
}

.modal-leave-active {
    opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}

.modal-footer {
    text-align: center;
}

.btn-close {
    border: none;
    font-size: 20px;
    padding: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
}
</style>

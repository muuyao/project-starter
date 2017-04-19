import Vue from 'vue';

const ModalConstructor = Vue.extend(require('./modal.vue'));

const modalPool = [];
const getAnInstance = () => {
  if (modalPool.length > 0) {
    const instance = modalPool[0];
    modalPool.splice(0, 1);
    return instance;
  }

  return new ModalConstructor({
    el: document.createElement('div')
  });
};
const returnAnInstance = (instance) => {
  if (instance) {
    modalPool.push(instance);
  }
};

const Modal = (options = {}) => {
  const instance = getAnInstance();
  const keys = Object.keys(options);

  keys.forEach((key) => {
    instance[key] = options[key];
  });

  document.body.appendChild(instance.$el);
  Vue.nextTick(() => {
    instance.visible = true;
  });
  return instance;
};

export default Modal;
export {
  ModalConstructor as ModalEle
};


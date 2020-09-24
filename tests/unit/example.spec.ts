import { shallowMount } from "@vue/test-utils";
import Title from "@/components/common/Title.vue";

//load Vuetify to use in tests
import Vue from "vue";
import Vuetify from "vuetify";
Vue.use(Vuetify);

describe("Title.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "Knowledge";
    const wrapper = shallowMount(Title, {
      propsData: { msg },
    });
    expect(wrapper.text()).toContain(msg);
  });
});

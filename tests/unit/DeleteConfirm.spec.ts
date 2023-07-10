import { mount } from "@vue/test-utils";
import DeleteConfirm from "@/components/DeleteConfirm.vue";

describe("DeleteConfirm.vue", () => {
  it("renders", () => {
    const wrapper = mount(DeleteConfirm);
    expect(wrapper.text()).toMatch("Delete Book");
  });

  it("renders click confirm", async () => {
    const wrapper = mount(DeleteConfirm);
    wrapper.vm.$emit("delete");
    wrapper.vm.$emit("close");

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().delete).toBeTruthy();
    expect(wrapper.emitted().close).toBeTruthy();
  });
});

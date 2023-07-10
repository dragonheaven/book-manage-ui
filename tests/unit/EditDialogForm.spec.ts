import { mount } from "@vue/test-utils";
import EditDialogForm from "@/components/EditDialogForm.vue";

describe("EditDialogForm.vue", () => {
  it("renders", () => {
    const wrapper = mount(EditDialogForm, {
      props: {
        book: {
          id: 1,
          title: "Test Book",
          status: "published",
        },
      },
    });
    expect(wrapper.text()).toMatch("Edit Book");
  });
  it("submit without no input data - check validation message", () => {
    const wrapper = mount(EditDialogForm);
    wrapper.find("[type='submit']").trigger("click");

    setTimeout(() => {
      expect(wrapper.text()).toMatch("Title is required.");
    }, 300);
  });
});

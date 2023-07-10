import { mount } from "@vue/test-utils";
import Books from "@/components/Books.vue";
import { store } from "@/store";

describe("Books.vue", () => {
  it("renders", () => {
    const wrapper = mount(Books, {
      global: {
        plugins: [store],
      },
    });
    expect(wrapper.text()).toMatch("Manage Books");
  });

  it("onCreate should create a book and show a success message", () => {
    const wrapper = mount(Books, {
      global: {
        plugins: [store],
      },
    });
    const book = { title: "Test Book", status: "pending" };
    wrapper.vm.onCreate(book);
    expect(wrapper.vm.showSnackBar).toBe(true);
    expect(wrapper.vm.alertMessage).toBe("Book is created successfully");

    const rows = wrapper.findAll("tr");
    expect(rows.length).toBe(2);
  });

  it("onUpdate should update a book and show a success message", async () => {
    const wrapper = mount(Books, {
      global: {
        plugins: [store],
      },
    });
    const book = { id: 1, title: "Test Book", status: "pending" };
    await wrapper.vm.onCreate(book);
    expect(wrapper.vm.showSnackBar).toBe(true);
    expect(wrapper.vm.alertMessage).toBe("Book is created successfully");

    const updatedBook = {
      id: 1,
      title: "Updated Test Book",
      status: "pending",
    };
    await wrapper.vm.onUpdate(updatedBook);

    setTimeout(() => {
      expect(wrapper.text()).toMatch("Updated Test Book");
    }, 300);
  });

  it("onDelete should delete a book and show a success message", async () => {
    const wrapper = mount(Books, {
      global: {
        plugins: [store],
      },
    });
    const book = { id: 1, title: "Test Book", status: "pending" };
    await wrapper.vm.onCreate(book);
    expect(wrapper.vm.showSnackBar).toBe(true);
    expect(wrapper.vm.alertMessage).toBe("Book is created successfully");

    await wrapper.vm.openDeleteDialog(book);
    await wrapper.vm.onDelete();

    const rows = wrapper.findAll("tr");

    expect(rows.length).toBe(3);
  });
});

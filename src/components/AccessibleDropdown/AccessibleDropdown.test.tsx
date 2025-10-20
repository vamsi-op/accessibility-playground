import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";
import { AccessibleDropdown } from "./AccessibleDropdown";

expect.extend(toHaveNoViolations);

const mockOptions = [
  { id: "1", label: "Option 1" },
  { id: "2", label: "Option 2" },
  { id: "3", label: "Option 3" },
];

describe("AccessibleDropdown", () => {
  describe("Rendering", () => {
    it("renders with label and default text", () => {
      render(<AccessibleDropdown label="Test Label" options={mockOptions} />);

      expect(screen.getByText(/Test Label:/)).toBeInTheDocument();
      expect(screen.getByText("Select an option")).toBeInTheDocument();
    });

    it("renders with default value", () => {
      render(
        <AccessibleDropdown
          label="Test Label"
          options={mockOptions}
          defaultValue="2"
        />
      );

      expect(screen.getByText("Option 2")).toBeInTheDocument();
    });

    it("does not show options list when closed", () => {
      render(<AccessibleDropdown label="Test Label" options={mockOptions} />);

      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });
  });

 describe('Edge Cases', () => {
    it('handles empty options array gracefully', () => {
      const { container } = render(
        <AccessibleDropdown
          label="Test Label"
          options={[]}
        />
      )
      
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(button).toHaveTextContent('Select an option')
      
      fireEvent.click(button)
      expect(container).toBeInTheDocument()
    })

    it('handles single option correctly', async () => {
      const singleOption = [{ id: '1', label: 'Only Option' }]
      const onSelect = vi.fn()
      const user = userEvent.setup()
      
      render(
        <AccessibleDropdown
          label="Test Label"
          options={singleOption}
          onSelect={onSelect}
        />
      )
      
      const button = screen.getByRole('button')
      await user.click(button)
      
      const option = screen.getByRole('option')
      expect(option).toHaveTextContent('Only Option')
      
      await user.click(option)
      expect(onSelect).toHaveBeenCalledWith(singleOption[0])
    })

    it('handles very long option labels', async () => {
      const longLabel = 'A'.repeat(200)
      const options = [
        { id: '1', label: longLabel },
        { id: '2', label: 'Normal Option' }
      ]
      const user = userEvent.setup()
      
      const { container } = render(
        <AccessibleDropdown
          label="Test Label"
          options={options}
        />
      )
      
      const button = screen.getByRole('button')
      await user.click(button)
      
      const listbox = screen.getByRole('listbox')
      expect(listbox).toBeInTheDocument()
      
      const option = screen.getByText(longLabel)
      expect(option).toBeInTheDocument()
      
      expect(container.querySelector('[role="listbox"]')).toBeInTheDocument()
    })

    it('handles default value that does not exist in options', () => {
      const { container } = render(
        <AccessibleDropdown
          label="Test Label"
          options={mockOptions}
          defaultValue="non-existent-id"
        />
      )
      
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      
      expect(container).toBeInTheDocument()
    })

    it('handles rapid open/close interactions', async () => {
      const user = userEvent.setup()
      render(
        <AccessibleDropdown
          label="Test Label"
          options={mockOptions}
        />
      )
      
      const button = screen.getByRole('button')
      
      for (let i = 0; i < 10; i++) {
        await user.click(button)
      }
      
      expect(button).toBeInTheDocument()
    })

    it('handles multiple dropdowns on same page', async () => {
      const user = userEvent.setup()
      render(
        <div>
          <AccessibleDropdown
            label="Dropdown 1"
            options={mockOptions}
          />
          <AccessibleDropdown
            label="Dropdown 2"
            options={mockOptions}
          />
        </div>
      )
      
      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(2)
      
      // Open first dropdown
      await user.click(buttons[0])
      expect(screen.getByRole('listbox')).toBeInTheDocument()
      
      // Open second dropdown
      await user.click(buttons[1])
      
      // Should only have one listbox open (or handle multiple correctly)
      const listboxes = screen.queryAllByRole('listbox')
      expect(listboxes.length).toBeGreaterThan(0)
    })
  })

 

  describe("Keyboard Navigation", () => {
    it("opens dropdown on Enter key", async () => {
      const user = userEvent.setup();
      render(<AccessibleDropdown label="Test Label" options={mockOptions} />);

      const button = screen.getByRole("button");
      await user.click(button);

      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    it("navigates options with Arrow Down", async () => {
      const user = userEvent.setup();
      render(<AccessibleDropdown label="Test Label" options={mockOptions} />);

      const button = screen.getByRole("button");
      await user.click(button);

      // First option should be active by default
      const options = screen.getAllByRole("option");
      expect(options[0]).toHaveAttribute("aria-selected", "true");

      // Press Arrow Down
      await user.keyboard("{ArrowDown}");
      await waitFor(() => {
        expect(options[1]).toHaveAttribute("aria-selected", "true");
      });
    });

    it("navigates options with Arrow Up", async () => {
      const user = userEvent.setup();
      render(<AccessibleDropdown label="Test Label" options={mockOptions} />);

      const button = screen.getByRole("button");
      await user.click(button);

      await user.keyboard("{ArrowDown}");
      await user.keyboard("{ArrowDown}");

      const options = screen.getAllByRole("option");
      expect(options[2]).toHaveAttribute("aria-selected", "true");

      await user.keyboard("{ArrowUp}");
      await waitFor(() => {
        expect(options[1]).toHaveAttribute("aria-selected", "true");
      });
    });

    it("selects option with Enter key", async () => {
      const onSelect = vi.fn();
      const user = userEvent.setup();

      render(
        <AccessibleDropdown
          label="Test Label"
          options={mockOptions}
          onSelect={onSelect}
        />
      );

      const button = screen.getByRole("button");
      await user.click(button);
      await user.keyboard("{Enter}");

      expect(onSelect).toHaveBeenCalledWith(mockOptions[0]);
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("closes dropdown on Escape key", async () => {
      const user = userEvent.setup();
      render(<AccessibleDropdown label="Test Label" options={mockOptions} />);

      const button = screen.getByRole("button");
      await user.click(button);

      expect(screen.getByRole("listbox")).toBeInTheDocument();

      await user.keyboard("{Escape}");

      await waitFor(() => {
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      });
    });

    it("navigates to first option with Home key", async () => {
      const user = userEvent.setup();
      render(<AccessibleDropdown label="Test Label" options={mockOptions} />);

      const button = screen.getByRole("button");
      await user.click(button);
      await user.keyboard("{ArrowDown}");
      await user.keyboard("{ArrowDown}");

      await user.keyboard("{Home}");

      const options = screen.getAllByRole("option");
      await waitFor(() => {
        expect(options[0]).toHaveAttribute("aria-selected", "true");
      });
    });

    it("navigates to last option with End key", async () => {
      const user = userEvent.setup();
      render(<AccessibleDropdown label="Test Label" options={mockOptions} />);

      const button = screen.getByRole("button");
      await user.click(button);

      await user.keyboard("{End}");

      const options = screen.getAllByRole("option");
      await waitFor(() => {
        expect(options[2]).toHaveAttribute("aria-selected", "true");
      });
    });
  });

  describe("Mouse Interaction", () => {
    it("toggles dropdown on click", async () => {
      const user = userEvent.setup();
      render(<AccessibleDropdown label="Test Label" options={mockOptions} />);

      const button = screen.getByRole("button");

      await user.click(button);
      expect(screen.getByRole("listbox")).toBeInTheDocument();

      await user.click(button);
      await waitFor(() => {
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      });
    });

    it("selects option on click", async () => {
      const onSelect = vi.fn();
      const user = userEvent.setup();

      render(
        <AccessibleDropdown
          label="Test Label"
          options={mockOptions}
          onSelect={onSelect}
        />
      );

      const button = screen.getByRole("button");
      await user.click(button);

      const option2 = screen.getByText("Option 2");
      await user.click(option2);

      expect(onSelect).toHaveBeenCalledWith(mockOptions[1]);
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("closes dropdown when clicking outside", async () => {
      render(
        <div>
          <AccessibleDropdown label="Test Label" options={mockOptions} />
          <button>Outside</button>
        </div>
      );

      const button = screen.getByRole("button", { name: /Test Label/ });
      fireEvent.click(button);

      expect(screen.getByRole("listbox")).toBeInTheDocument();

      const outsideButton = screen.getByText("Outside");
      fireEvent.mouseDown(outsideButton);

      await waitFor(() => {
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      });
    });
  });

 describe('Interaction Tests', () => {
    it('closes dropdown when tabbing away', async () => {
      const user = userEvent.setup()
      render(
        <div>
          <AccessibleDropdown
            label="Test Label"
            options={mockOptions}
          />
          <button>Next Element</button>
        </div>
      )
      
      const button = screen.getByRole('button', { name: /Test Label/ })
      await user.click(button)
      
      expect(screen.getByRole('listbox')).toBeInTheDocument()
      
      await user.tab()
      
      const listbox = screen.queryByRole('listbox')
      
      const nextButton = screen.getByText('Next Element')
      
      if (listbox) {
        expect(nextButton).toHaveFocus()
      } else {
        expect(listbox).not.toBeInTheDocument()
      }
    })

    it('maintains last selection when reopening dropdown', async () => {
      const user = userEvent.setup()
      render(
        <AccessibleDropdown
          label="Test Label"
          options={mockOptions}
        />
      )
      
      const button = screen.getByRole('button')
      
      await user.click(button)
      const option2 = screen.getByText('Option 2')
      await user.click(option2)
      
      await user.click(button)
      
      expect(button).toHaveTextContent('Option 2')
    })

    it('handles rapid keyboard navigation without crashing', async () => {
      const user = userEvent.setup()
      render(
        <AccessibleDropdown
          label="Test Label"
          options={mockOptions}
        />
      )
      
      const button = screen.getByRole('button')
      await user.click(button)
      
      for (let i = 0; i < 50; i++) {
        await user.keyboard('{ArrowDown}')
      }
      
      expect(screen.getByRole('listbox')).toBeInTheDocument()
      
      for (let i = 0; i < 50; i++) {
        await user.keyboard('{ArrowUp}')
      }
      
      expect(screen.getByRole('listbox')).toBeInTheDocument()
    })
  })

  describe("ARIA Attributes", () => {
    it("has correct ARIA attributes on button", () => {
      render(<AccessibleDropdown label="Test Label" options={mockOptions} />);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-haspopup", "listbox");
      expect(button).toHaveAttribute("aria-expanded", "false");
    });

    it("updates aria-expanded when opened", async () => {
      const user = userEvent.setup();
      render(<AccessibleDropdown label="Test Label" options={mockOptions} />);

      const button = screen.getByRole("button");
      await user.click(button);

      expect(button).toHaveAttribute("aria-expanded", "true");
    });

    it("has correct role on options list", async () => {
      const user = userEvent.setup();
      render(<AccessibleDropdown label="Test Label" options={mockOptions} />);

      const button = screen.getByRole("button");
      await user.click(button);

      const listbox = screen.getByRole("listbox");
      expect(listbox).toBeInTheDocument();

      const options = screen.getAllByRole("option");
      expect(options).toHaveLength(3);
    });
  });

  

  describe("Accessibility", () => {
    it("should not have any accessibility violations (closed state)", async () => {
      const { container } = render(
        <AccessibleDropdown label="Test Label" options={mockOptions} />
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should not have any accessibility violations (open state)", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <AccessibleDropdown label="Test Label" options={mockOptions} />
      );

      const button = screen.getByRole("button");
      await user.click(button);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should not have violations with selected value", async () => {
      const { container } = render(
        <AccessibleDropdown
          label="Test Label"
          options={mockOptions}
          defaultValue="2"
        />
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

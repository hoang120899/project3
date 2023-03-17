import { Icon } from "@fluentui/react";
import {
  Button,
  Popover,
  PopoverSurface,
  PopoverTrigger,
  PositioningImperativeRef,
  Text,
} from "@fluentui/react-components";
import { useCallback, useEffect, useRef, useState } from "react";
import { User } from "src/models";

export interface TableActionsProps {
  record: User;
  deleteAction?: (id: string) => void;
}

export function TableActions({ record, deleteAction }: TableActionsProps) {
  const [open, setOpen] = useState(false);
  const handleConfirmAction = useCallback(() => {
    deleteAction && deleteAction(record.id);
    setOpen(false);
  }, []);

  //
  const buttonRef = useRef<HTMLButtonElement>(null);
  const positioningRef = useRef<PositioningImperativeRef>(null);

  useEffect(() => {
    if (buttonRef.current) {
      positioningRef.current?.setTarget(buttonRef.current);
    }
  }, [buttonRef, positioningRef]);
  return (
    <div className="flex">
      <Button icon={<Icon iconName="EditSolid12" />}></Button>
      <div>
        <Popover withArrow positioning={{ positioningRef }}>
          <PopoverTrigger disableButtonEnhancement>
            <Button icon={<Icon iconName="Delete" />} className="ml-4"></Button>
          </PopoverTrigger>

          <PopoverSurface>
            <PopoverTrigger disableButtonEnhancement>
              <Button icon={<Icon iconName="Delete" />} className="ml-4">
                Delete
              </Button>
            </PopoverTrigger>
            <div className="mb-4">
              <Text weight="bold">Are you sure delete?</Text>
            </div>
          </PopoverSurface>
        </Popover>
        <Popover withArrow open={open}>
          <PopoverTrigger>
            <Button
              onClick={(e) => setOpen(true)}
              icon={<Icon iconName="Delete" />}
              className="ml-4"
              id="buttonDelete"
            ></Button>
          </PopoverTrigger>
          <PopoverSurface>
            <div className="mb-4">
              <Text weight="bold">Are you sure delete?</Text>
            </div>
            <div>
              <Button onClick={() => setOpen(false)} className="ml-4 w-fit">
                No
              </Button>
              <Button
                onClick={() => handleConfirmAction()}
                className="ml-4 w-fit"
                appearance="primary"
              >
                Yes
              </Button>
            </div>
          </PopoverSurface>
        </Popover>
      </div>
    </div>
  );
}

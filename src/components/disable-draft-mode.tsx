"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { disableDraftMode } from "../../actions/disable-draft-mode";
import { Button } from "./ui";

export function DisableDraftMode() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const isIframeOrPopup =
    typeof window !== "undefined" &&
    (window !== window.parent || !!window.opener);
  if (isIframeOrPopup) {
    return null;
  }

  const disable = () =>
    startTransition(async () => {
      await disableDraftMode();
      router.refresh();
    });

  return (
    <div className="w-fit ml-auto px-4">
      {pending ? (
        "Disabling draft mode..."
      ) : (
        <Button type="button" variant="destructive" onClick={disable} className="cursor-pointer">
          Disable draft mode
        </Button>
      )}
    </div>
  );
}

import { BRAND_NAME } from "@/lib/constants"

export function SiteFooter() {
  return (
    <footer className="bg-[#1a1a1a] text-white py-8 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <img
          src="https://ucarecdn.com/37803e63-fc59-4483-b860-360959066d1c/-/format/auto/"
          alt={BRAND_NAME}
          className="mx-auto mb-4 h-16"
        />
        <p className="text-neutral-400">
          {"© 2026 "}{BRAND_NAME}{". All rights reserved."}
        </p>
      </div>
    </footer>
  )
}

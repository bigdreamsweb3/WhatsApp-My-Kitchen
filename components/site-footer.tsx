import Image from "next/image"
import { BRAND_NAME } from "@/lib/constants"

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white py-8 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <Image
          src="https://ucarecdn.com/37803e63-fc59-4483-b860-360959066d1c/-/format/auto/"
          alt={BRAND_NAME}
          width={160}
          height={64}
          className="mx-auto mb-4 h-16 w-auto"
        />
        <p className="text-gray-400">
          {"© "}{year} {BRAND_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

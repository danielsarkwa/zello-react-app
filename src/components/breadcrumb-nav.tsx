import React from "react"
import { useLocation } from "react-router"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb"

export default function BreadcrumbNav() {
  const location = useLocation()
  const pathnames = location.pathname.split("/").filter((x) => x)

  if (pathnames.length === 0) return null

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`
          const isLast = index === pathnames.length - 1
          const isFirst = index === 0

          return (
            <React.Fragment key={routeTo}>
              {!isFirst && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="capitalized">{name.replace(/-/g, " ")}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={routeTo} className="capitalize hover:text-foreground">
                    {name.replace(/-/g, " ")}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

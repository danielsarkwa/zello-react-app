import React from "react"
import { Link, useLocation } from "react-router"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb"

const capitalize = (str: string) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

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
          const displayText = capitalize(name.replace(/-/g, " "))

          return (
            <React.Fragment key={routeTo}>
              {!isFirst && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{displayText}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={routeTo} className="hover:text-foreground">
                      {displayText}
                    </Link>
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

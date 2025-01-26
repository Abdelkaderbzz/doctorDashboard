"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BarChart2, Folder } from "lucide-react"

interface User {
  id: string
  name: string
  age: number
  addiction: string
  treatmentStartDate: string
  strike: number
}

const users: User[] = [
  { id: "1", name: "John Doe", age: 35, addiction: "Alcohol", treatmentStartDate: "2023-01-15", strike: 2 },
  { id: "2", name: "Jane Smith", age: 28, addiction: "Gambling", treatmentStartDate: "2023-03-22", strike: 0 },
  { id: "3", name: "Mike Johnson", age: 42, addiction: "Drugs", treatmentStartDate: "2022-11-30", strike: 1 },
  { id: "4", name: "Emily Brown", age: 31, addiction: "Shopping", treatmentStartDate: "2023-02-10", strike: 3 },
  { id: "5", name: "Chris Wilson", age: 39, addiction: "Gaming", treatmentStartDate: "2023-04-05", strike: 1 },
]

const addictionTypes = Array.from(new Set(users.map((user) => user.addiction)))

export default function UserDataTable() {
  const [nameFilter, setNameFilter] = useState("")
  const [addictionFilter, setAddictionFilter] = useState("")

  const handleViewStatistics = (userId: string) => {
    console.log(`View statistics for user with ID: ${userId}`)
    // Here you would typically navigate to a statistics page or open a modal
    // For example: router.push(`/user/${userId}/statistics`)
  }

  const clearFilters = () => {
    setNameFilter("")
    setAddictionFilter("")
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
      (addictionFilter === "all" || addictionFilter === "" || user.addiction === addictionFilter),
  )

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">User Addiction Treatment Data</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Input
          placeholder="Filter by name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="sm:w-1/3"
        />
        <div className="relative sm:w-1/3">
          <select
            value={addictionFilter}
            onChange={(e) => setAddictionFilter(e.target.value)}
            className="appearance-none w-full bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">Filter by addiction type</option>
            <option value="all">All addictions</option>
            {addictionTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <Folder className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
        </div>
        <Button onClick={clearFilters} variant="outline" className="sm:w-1/3">
          Clear Filters
        </Button>
      </div>

      <div className="overflow-x-auto">
        {filteredUsers.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Addiction</TableHead>
                <TableHead className="w-[180px]">Treatment Start Date</TableHead>
                <TableHead>Strike</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.age}</TableCell>
                  <TableCell>{user.addiction}</TableCell>
                  <TableCell>{user.treatmentStartDate}</TableCell>
                  <TableCell>{user.strike}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => handleViewStatistics(user.id)}>
                      <BarChart2 className="mr-2 h-4 w-4" />
                      View Statistics
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-10">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No data found</h3>
            <p className="mt-1 text-sm text-gray-500">Try changing your search criteria or clear the filters.</p>
            <div className="mt-6">
              <Button onClick={clearFilters}>Clear filters</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


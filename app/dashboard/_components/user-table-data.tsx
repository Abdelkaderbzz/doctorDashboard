"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BarChart2, Folder } from "lucide-react";
import Link from "next/link";

interface User {
  id: string;
  name: string;
  age: number;
  addiction: string;
  treatmentStartDate: string;
  strike: number;
}

const users: any = [
  {
    id: "1",
    name: "John Doe",
    age: 35,
    gender: "Male",
    addiction: "Alcohol",
    treatmentStartDate: "2023-01-15",
    strike: 2,
    lastLogin: "2023-06-10",
    stepsCompleted: [5, 7, 3, 8, 6, 4, 9],
    substanceType: "Alcohol",
    frequencyOfUse: "Daily",
    durationOfUse: "5 years",
    quantity: "750ml of vodka per day",
    withdrawalSymptoms: "Severe (tremors, anxiety, insomnia)",
    overdoseHistory: "None",
    healthComplications: "Liver damage",
    infectiousDiseases: "None",
    triggers: "Stress, social situations",
    supportSystem: "Supportive family",
    highRiskBehaviors: "Driving under influence",
    criminalInvolvement: "1 DUI charge",
    previousAttempts: "2 (AA meetings, outpatient rehab)",
    relapseHistory: "1 (after 6 months sober, due to job loss)",
    barriersToTreatment: "Cost of inpatient rehab",
    readinessForChange: 8,
    recoveryGoals: "Achieve sobriety, rebuild career",
    perceivedBenefits: "Improved health, better relationships",
  },
  {
    id: "2",
    name: "Jane Smith",
    age: 28,
    gender: "Female",
    addiction: "Opioids",
    treatmentStartDate: "2023-03-22",
    strike: 0,
    lastLogin: "2023-06-12",
    stepsCompleted: [3, 5, 8, 6, 7, 9, 4],
    substanceType: "Prescription opioids",
    frequencyOfUse: "Multiple times daily",
    durationOfUse: "3 years",
    quantity: "60mg oxycodone per day",
    withdrawalSymptoms: "Moderate (nausea, muscle aches)",
    overdoseHistory: "1 non-fatal overdose",
    healthComplications: "Chronic constipation",
    infectiousDiseases: "None",
    triggers: "Chronic pain, anxiety",
    supportSystem: "Supportive partner, estranged from family",
    highRiskBehaviors: "Doctor shopping",
    criminalInvolvement: "None",
    previousAttempts: "1 (methadone maintenance)",
    relapseHistory: "2 (due to inadequate pain management)",
    barriersToTreatment: "Fear of withdrawal",
    readinessForChange: 6,
    recoveryGoals: "Find alternative pain management, reconnect with family",
    perceivedBenefits: "Freedom from addiction, improved mental health",
  },
  {
    id: "3",
    name: "Mike Johnson",
    age: 42,
    gender: "Male",
    addiction: "Cocaine",
    treatmentStartDate: "2022-11-30",
    strike: 1,
    lastLogin: "2023-06-11",
    stepsCompleted: [6, 4, 7, 5, 8, 3, 6],
    substanceType: "Cocaine",
    frequencyOfUse: "Weekly binges",
    durationOfUse: "7 years",
    quantity: "3-5 grams per binge",
    withdrawalSymptoms: "Mild (fatigue, depression)",
    overdoseHistory: "None",
    healthComplications: "Nasal damage, heart palpitations",
    infectiousDiseases: "None",
    triggers: "Work stress, parties",
    supportSystem: "Supportive friends, no family support",
    highRiskBehaviors: "Unprotected sex",
    criminalInvolvement: "1 possession charge",
    previousAttempts: "3 (outpatient rehab, therapy)",
    relapseHistory: "Multiple, shortest period sober was 2 months",
    barriersToTreatment: "Work commitments, stigma",
    readinessForChange: 7,
    recoveryGoals: "Maintain sobriety, improve work-life balance",
    perceivedBenefits: "Career advancement, financial stability",
  },
  {
    id: "4",
    name: "Emily Chen",
    age: 31,
    gender: "Female",
    addiction: "Gambling",
    treatmentStartDate: "2023-02-18",
    strike: 1,
    lastLogin: "2023-06-13",
    stepsCompleted: [4, 6, 5, 7, 8, 6, 7],
    substanceType: "N/A",
    frequencyOfUse: "Daily online gambling",
    durationOfUse: "4 years",
    quantity: "Average $500 per day",
    withdrawalSymptoms: "Moderate (anxiety, irritability)",
    overdoseHistory: "N/A",
    healthComplications: "Depression",
    infectiousDiseases: "None",
    triggers: "Financial stress, boredom",
    supportSystem: "Supportive parents, few close friends",
    highRiskBehaviors: "Taking loans for gambling",
    criminalInvolvement: "None",
    previousAttempts: "1 (Gamblers Anonymous)",
    relapseHistory: "1 (after 3 months, due to job loss)",
    barriersToTreatment: "Shame, denial of problem severity",
    readinessForChange: 7,
    recoveryGoals: "Financial stability, rebuild relationships",
    perceivedBenefits: "Debt-free life, improved mental health",
  },
  {
    id: "5",
    name: "Alex Thompson",
    age: 25,
    gender: "Non-binary",
    addiction: "Methamphetamine",
    treatmentStartDate: "2023-04-05",
    strike: 3,
    lastLogin: "2023-06-09",
    stepsCompleted: [2, 3, 4, 3, 5, 4, 6],
    substanceType: "Methamphetamine",
    frequencyOfUse: "Multiple times daily",
    durationOfUse: "2 years",
    quantity: "1-2 grams per day",
    withdrawalSymptoms: "Severe (extreme fatigue, depression, cravings)",
    overdoseHistory: "2 non-fatal overdoses",
    healthComplications: "Dental problems, weight loss",
    infectiousDiseases: "Hepatitis C",
    triggers: "Peer pressure, depression",
    supportSystem: "Limited, one supportive sibling",
    highRiskBehaviors: "Needle sharing, unprotected sex",
    criminalInvolvement: "2 possession charges",
    previousAttempts: "2 (inpatient rehab, outpatient program)",
    relapseHistory: "3 (shortest period sober was 1 month)",
    barriersToTreatment: "Lack of insurance, distrust in healthcare system",
    readinessForChange: 5,
    recoveryGoals: "Stable housing, reconnect with family",
    perceivedBenefits: "Improved physical health, employment opportunities",
  },
];

const addictionTypes = Array.from(
  new Set(users.map((user: any) => user.addiction))
);

export default function UserDataTable() {
  const [nameFilter, setNameFilter] = useState("");
  const [addictionFilter, setAddictionFilter] = useState("");

  const handleViewStatistics = (userId: string) => {
    console.log(`View statistics for user with ID: ${userId}`);
    // Here you would typically navigate to a statistics page or open a modal
    // For example: router.push(`/user/${userId}/statistics`)
  };

  const clearFilters = () => {
    setNameFilter("");
    setAddictionFilter("");
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
      (addictionFilter === "all" ||
        addictionFilter === "" ||
        user.addiction === addictionFilter)
  );

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
            {addictionTypes?.map((type,index) => (
              <option key={index} value={type}>
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
                <TableHead className="w-[180px]">
                  Treatment Start Date
                </TableHead>
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
                    <Link href={`/dashboard/user/${user.id}`} passHref>
                      <Button variant="outline" size="sm">
                        <BarChart2 className="mr-2 h-4 w-4" />
                        View Statistics
                      </Button>
                    </Link>
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
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No data found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Try changing your search criteria or clear the filters.
            </p>
            <div className="mt-6">
              <Button onClick={clearFilters}>Clear filters</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

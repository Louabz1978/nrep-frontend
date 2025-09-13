import React from "react";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import { Skeleton } from "@/components/global/ui/skeleton";
import FormSectionHeader from "@/components/global/typography/FormSectionHeader";

const ContractSignatureSkeleton: React.FC = () => {
  return (
    <PageContainer>
      <div className="animate-pulse">
        {/* Header */}
        <div className="mb-6">
          <Skeleton className="h-10 w-1/3 mx-auto" />
        </div>

        {/* Approval Message */}
        <div className="flex items-center justify-center p-xl text-size22">
          <Skeleton className="h-6 w-3/4" />
        </div>

        {/* Parties Section */}
        <div className="pt-3xl">
          <Skeleton className="h-8 w-32 mb-4" />
          {/* Sellers Section */}
          <div className="flex flex-wrap gap-4xl pt-3xl mb-4">
            {[...Array(2)].map((_, index) => (
              <div
                key={index}
                className="flex flex-wrap gap-2 w-full md:w-auto"
              >
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-10 w-40" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-10 w-40" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-10 w-40" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-10 w-40" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-10 w-40" />
              </div>
            ))}
          </div>
          {/* Buyers Section */}
          <div className="flex flex-wrap gap-3xl pt-3xl mb-4">
            {[...Array(2)].map((_, index) => (
              <div
                key={index}
                className="flex flex-wrap gap-2 w-full md:w-auto"
              >
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-10 w-40" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-10 w-40" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-10 w-40" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-10 w-40" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-10 w-40" />
              </div>
            ))}
          </div>
          <div className="pt-3xl">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-11/12 mb-2" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>

        {/* Property Description Section */}
        <div className="pt-3xl">
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="flex flex-wrap gap-4xl mb-3xl">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-10 w-32" />
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-5xl mb-3xl">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-10 w-32" />
              </div>
            ))}
          </div>
          <div className="mb-3xl">
            <div className="flex items-center gap-md">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
          <div className="text-size18">
            <Skeleton className="h-4 w-full mb-3" />
            <Skeleton className="h-4 w-11/12 mb-3" />
            <Skeleton className="h-4 w-5/6 mb-3" />
            <Skeleton className="h-4 w-full mb-3" />
            <Skeleton className="h-4 w-11/12 mb-3" />
            <Skeleton className="h-4 w-5/6 mb-3" />
            <Skeleton className="h-4 w-full" />
          </div>
          <div className="flex items-center gap-md text-size18 mt-4">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-6 w-2/3" />
          </div>
        </div>

        {/* Purchase Price and Closing Section */}
        <div className="mt-8">
          <div className="flex items-center justify-center flex-wrap mt-2xl mb-3xl">
            <FormSectionHeader>
              <Skeleton className="h-10 w-64" />
            </FormSectionHeader>
          </div>
          <div className="flex items-center gap-md mb-4">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-10 w-64" />
          </div>
          <div className="flex items-center gap-lg mb-4">
            <Skeleton className="h-5 w-5 rounded-sm" />
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-10 w-48" />
          </div>
          <div className="flex items-center gap-lg mb-4">
            <Skeleton className="h-5 w-5 rounded-sm" />
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-10 w-48" />
          </div>
          <div className="flex items-center gap-lg mb-4">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-10 w-48" />
          </div>
          <Skeleton className="h-4 w-full mb-4" />
          <div className="flex items-center gap-xl mb-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-5 w-5 rounded-sm" />
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-5 w-5 rounded-sm" />
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-6 w-64" />
          </div>
        </div>

        {/* Agent Details */}
        <div className="mt-8">
          <div className="flex flex-wrap justify-between gap-sm mb-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-1">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-10 w-32" />
              </div>
            ))}
          </div>
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
          <div className="flex flex-wrap justify-between gap-sm mb-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-1">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-10 w-32" />
              </div>
            ))}
          </div>
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2xl mb-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-10 w-32" />
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2xl mb-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-10 w-32" />
              </div>
            ))}
          </div>
        </div>

        {/* Additional Payment Details */}
        <div className="mt-8">
          <div className="flex flex-wrap items-center gap-2 text-size18 mb-4">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-10 w-32" />
          </div>
          <Skeleton className="h-4 w-full mb-4" />
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>

        {/* Time of Acceptance and Effective Date Section */}
        <div className="mt-2xl">
          <Skeleton className="h-8 w-3/4 mb-4" />
          <div className="flex items-center gap-2 mb-2">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-10 w-32" />
          </div>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full" />
        </div>

        {/* Closing Section */}
        <div className="mt-2xl">
          <Skeleton className="h-8 w-1/2 mb-4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
        </div>

        {/* Signatures Section */}
        <div className="mt-3xl">
          <FormSectionHeader>
            <Skeleton className="h-10 w-48" />
          </FormSectionHeader>
          <div className="flex flex-col gap-[40px] items-start justify-center mt-3xl">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-[30px] items-start w-full">
                <Skeleton className="h-6 w-24" />
                <div className="flex flex-col items-center gap-[4px] w-full">
                  <Skeleton className="h-6 w-40 mb-2" />
                  <Skeleton className="h-20 w-64 border" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default ContractSignatureSkeleton;

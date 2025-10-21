import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Import all the hooks
import useGetCounties from "@/hooks/admin/locations/useGetCounties";
import useGetCities from "@/hooks/admin/locations/useGetCities";
import useGetAreas from "@/hooks/admin/locations/useGetAreas";
import useCreateCounty from "@/hooks/admin/locations/useCreateCounty";
import useCreateCity from "@/hooks/admin/locations/useCreateCity";
import useCreateArea from "@/hooks/admin/locations/useCreateArea";
import useUpdateCounty from "@/hooks/admin/locations/useUpdateCounty";
import useUpdateCity from "@/hooks/admin/locations/useUpdateCity";
import useUpdateArea from "@/hooks/admin/locations/useUpdateArea";
import useDeleteCounty from "@/hooks/admin/locations/useDeleteCounty";
import useDeleteCity from "@/hooks/admin/locations/useDeleteCity";
import useDeleteArea from "@/hooks/admin/locations/useDeleteArea";

import type {
  CreateCountyTypes,
  CreateCityTypes,
  CreateAreaTypes,
} from "@/types/admin/location";

const LocationManagementExample: React.FC = () => {
  // State for forms
  const [countyName, setCountyName] = useState("");
  const [cityName, setCityName] = useState("");
  const [areaName, setAreaName] = useState("");
  const [selectedCountyId, setSelectedCountyId] = useState<number | null>(null);
  const [selectedCityId, setSelectedCityId] = useState<number | null>(null);
  const [editingCountyId, setEditingCountyId] = useState<number | null>(null);
  const [editingCityId, setEditingCityId] = useState<number | null>(null);
  const [editingAreaId, setEditingAreaId] = useState<number | null>(null);

  // Fetch data hooks
  const { counties, countiesQuery } = useGetCounties();
  const { cities, citiesQuery } = useGetCities({
    queryParams: { county_id: selectedCountyId },
  });
  const { areas, areasQuery } = useGetAreas({
    queryParams: { city_id: selectedCityId },
  });

  // Create hooks
  const { createCountyMutation } = useCreateCounty();
  const { createCityMutation } = useCreateCity();
  const { createAreaMutation } = useCreateArea();

  // Update hooks
  const { updateCountyMutation } = useUpdateCounty();
  const { updateCityMutation } = useUpdateCity();
  const { updateAreaMutation } = useUpdateArea();

  // Delete hooks
  const { deleteCountyMutation } = useDeleteCounty();
  const { deleteCityMutation } = useDeleteCity();
  const { deleteAreaMutation } = useDeleteArea();

  // County handlers
  const handleCreateCounty = () => {
    if (!countyName.trim()) return;

    const data: CreateCountyTypes = {
      name: countyName.trim(),
    };

    createCountyMutation.mutate(data, {
      onSuccess: () => {
        setCountyName("");
        countiesQuery.refetch();
      },
    });
  };

  const handleUpdateCounty = (id: number, newName: string) => {
    updateCountyMutation.mutate(
      { id, data: { name: newName } },
      {
        onSuccess: () => {
          setEditingCountyId(null);
          countiesQuery.refetch();
        },
      }
    );
  };

  const handleDeleteCounty = (id: number) => {
    if (window.confirm("Are you sure you want to delete this county?")) {
      deleteCountyMutation.mutate(
        { id },
        {
          onSuccess: () => {
            countiesQuery.refetch();
            citiesQuery.refetch();
          },
        }
      );
    }
  };

  // City handlers
  const handleCreateCity = () => {
    if (!cityName.trim() || !selectedCountyId) return;

    const data: CreateCityTypes = {
      name: cityName.trim(),
      county_id: selectedCountyId,
    };

    createCityMutation.mutate(data, {
      onSuccess: () => {
        setCityName("");
        citiesQuery.refetch();
      },
    });
  };

  const handleUpdateCity = (id: number, newName: string) => {
    updateCityMutation.mutate(
      { id, data: { name: newName } },
      {
        onSuccess: () => {
          setEditingCityId(null);
          citiesQuery.refetch();
        },
      }
    );
  };

  const handleDeleteCity = (id: number) => {
    if (window.confirm("Are you sure you want to delete this city?")) {
      deleteCityMutation.mutate(
        { id },
        {
          onSuccess: () => {
            citiesQuery.refetch();
            areasQuery.refetch();
          },
        }
      );
    }
  };

  // Area handlers
  const handleCreateArea = () => {
    if (!areaName.trim() || !selectedCityId) return;

    const data: CreateAreaTypes = {
      name: areaName.trim(),
      city_id: selectedCityId,
    };

    createAreaMutation.mutate(data, {
      onSuccess: () => {
        setAreaName("");
        areasQuery.refetch();
      },
    });
  };

  const handleUpdateArea = (id: number, newName: string) => {
    updateAreaMutation.mutate(
      { id, data: { name: newName } },
      {
        onSuccess: () => {
          setEditingAreaId(null);
          areasQuery.refetch();
        },
      }
    );
  };

  const handleDeleteArea = (id: number) => {
    if (window.confirm("Are you sure you want to delete this area?")) {
      deleteAreaMutation.mutate(
        { id },
        {
          onSuccess: () => {
            areasQuery.refetch();
          },
        }
      );
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Location Management</h1>

      {/* Counties Section */}
      <Card>
        <CardHeader>
          <CardTitle>Counties</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="County name"
              value={countyName}
              onChange={(e) => setCountyName(e.target.value)}
            />
            <Button
              onClick={handleCreateCounty}
              disabled={createCountyMutation.isPending}
            >
              {createCountyMutation.isPending ? "Creating..." : "Create County"}
            </Button>
          </div>

          <div className="space-y-2">
            {counties?.map((county) => (
              <div
                key={county.county_id}
                className="flex items-center gap-2 p-2 border rounded"
              >
                {editingCountyId === county.county_id ? (
                  <div className="flex gap-2">
                    <Input
                      defaultValue={county.title}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleUpdateCounty(
                            county.county_id,
                            e.currentTarget.value
                          );
                        }
                        if (e.key === "Escape") {
                          setEditingCountyId(null);
                        }
                      }}
                    />
                    <Button size="sm" onClick={() => setEditingCountyId(null)}>
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <>
                    <span className="flex-1">{county.title}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingCountyId(county.county_id)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteCounty(county.county_id)}
                      disabled={deleteCountyMutation.isPending}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cities Section */}
      <Card>
        <CardHeader>
          <CardTitle>Cities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Select
              value={selectedCountyId?.toString()}
              onValueChange={(value) => setSelectedCountyId(Number(value))}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select County" />
              </SelectTrigger>
              <SelectContent>
                {counties?.map((county) => (
                  <SelectItem
                    key={county.county_id}
                    value={county.county_id.toString()}
                  >
                    {county.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="City name"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
            />
            <Button
              onClick={handleCreateCity}
              disabled={createCityMutation.isPending || !selectedCountyId}
            >
              {createCityMutation.isPending ? "Creating..." : "Create City"}
            </Button>
          </div>

          <div className="space-y-2">
            {cities?.map((city) => (
              <div
                key={city.city_id}
                className="flex items-center gap-2 p-2 border rounded"
              >
                {editingCityId === city.city_id ? (
                  <div className="flex gap-2">
                    <Input
                      defaultValue={city.title}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleUpdateCity(city.city_id, e.currentTarget.value);
                        }
                        if (e.key === "Escape") {
                          setEditingCityId(null);
                        }
                      }}
                    />
                    <Button size="sm" onClick={() => setEditingCityId(null)}>
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <>
                    <span className="flex-1">{city.title}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingCityId(city.city_id)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteCity(city.city_id)}
                      disabled={deleteCityMutation.isPending}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Areas Section */}
      <Card>
        <CardHeader>
          <CardTitle>Areas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Select
              value={selectedCityId?.toString()}
              onValueChange={(value) => setSelectedCityId(Number(value))}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                {cities?.map((city) => (
                  <SelectItem
                    key={city.city_id}
                    value={city.city_id.toString()}
                  >
                    {city.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="Area name"
              value={areaName}
              onChange={(e) => setAreaName(e.target.value)}
            />
            <Button
              onClick={handleCreateArea}
              disabled={createAreaMutation.isPending || !selectedCityId}
            >
              {createAreaMutation.isPending ? "Creating..." : "Create Area"}
            </Button>
          </div>

          <div className="space-y-2">
            {areas?.map((area) => (
              <div
                key={area.area_id}
                className="flex items-center gap-2 p-2 border rounded"
              >
                {editingAreaId === area.area_id ? (
                  <div className="flex gap-2">
                    <Input
                      defaultValue={area.title}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleUpdateArea(area.area_id, e.currentTarget.value);
                        }
                        if (e.key === "Escape") {
                          setEditingAreaId(null);
                        }
                      }}
                    />
                    <Button size="sm" onClick={() => setEditingAreaId(null)}>
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <>
                    <span className="flex-1">{area.title}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingAreaId(area.area_id)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteArea(area.area_id)}
                      disabled={deleteAreaMutation.isPending}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LocationManagementExample;

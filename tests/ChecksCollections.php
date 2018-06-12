<?php

namespace Tests;

trait ChecksCollections
{
    /**
     * Checks a collection against a list of ids.
     * @param \Illuminate\Support\Collection $collection
     * @param array                          $expectedIds
     * @return true if the list of ids matches the id attributes in collection. false, otherwise.
     */
    public static function checkCollectionIds($collection, $expectedIds)
    {
        if ($collection->count() !== count($expectedIds)) {
            return false;
        }

        return $collection->every(function($item, $key) use ($expectedIds) {
            return $item->id === $expectedIds[$key];
        });
    }
}

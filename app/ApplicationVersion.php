<?php

namespace App;

class ApplicationVersion
{
    // Bump here
    const MAJOR = 0;
    const MINOR = 0;
    const PATCH = 0;

    public static function get()
    {
        // Latest revision for non-production deployments
        // Production deployments get defined version (TODO: get from git tag?)
        if (\App::environment() === 'production') {
            return sprintf('Version %s.%s.%s', self::MAJOR, self::MINOR, self::PATCH);
        }
        else {
            return sprintf('revision %s.%s',
                date('Y.m.d', trim(exec('git log --pretty="%ct" -n1 HEAD'))),
                trim(exec('git rev-parse --short=6 HEAD'))
            );
        }
    }
}

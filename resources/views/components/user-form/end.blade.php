{{-- Correlate opening tags in components/user-form/start.blade.php --}}

                @if (count($errors) > 0)
                    <div class="alert alert-danger" role="alert">
                        <ul>
                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif

                <button type="submit" class="btn btn-default">Submit</button>
            </form>
        </div>
    </div>
</div>
